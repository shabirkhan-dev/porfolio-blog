import {
  DEFAULT_SIMULATION_CONFIG,
  PIPELINE_STAGES,
  STAGE_LABELS,
  type AggregateResult,
  type CacheBehavior,
  type CacheResult,
  type FailureInjection,
  type NodeSnapshot,
  type NodeVisualState,
  type PipelineStage,
  type RequestMode,
  type RequestRunResult,
  type RetryPolicy,
  type SimulationCallbacks,
  type SimulationConfig,
  type SimulationSnapshot,
  type TraceEntry,
  type TraceStatus,
  type TrafficMode,
} from "./request-flow.types";

const BASE_DURATIONS: Record<PipelineStage, number> = {
  client: 12,
  gateway: 18,
  authentication: 48,
  rateLimiter: 8,
  service: 32,
  cache: 22,
  database: 78,
  response: 16,
};

const NON_RETRY_FAILURES: FailureInjection[] = ["auth", "rateLimit", "network"];

let idCounter = 0;
function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function trafficCount(traffic: TrafficMode): number {
  if (traffic === "burst5") return 5;
  if (traffic === "burst20") return 20;
  return 1;
}

function slowMultiplier(mode: RequestMode): number {
  return mode === "slow" ? 2.4 : 1;
}

export function resolveCacheHit(
  requestMode: RequestMode,
  cacheBehavior: CacheBehavior,
): boolean {
  if (cacheBehavior === "disabled") return false;
  if (cacheBehavior === "forceHit") return true;
  if (cacheBehavior === "forceMiss") return false;
  if (requestMode === "cached") return true;
  if (requestMode === "write") return false;
  return Math.random() < 0.35;
}

export function failureStage(
  failure: FailureInjection,
): PipelineStage | null {
  switch (failure) {
    case "auth":
      return "authentication";
    case "rateLimit":
      return "rateLimiter";
    case "service":
      return "service";
    case "cacheUnavailable":
      return "cache";
    case "dbTimeout":
      return "database";
    case "network":
      return "gateway";
    default:
      return null;
  }
}

export function canRetryFailure(
  failure: FailureInjection,
  stage: PipelineStage,
  retryPolicy: RetryPolicy,
  retryCount: number,
): boolean {
  if (retryPolicy === "none") return false;
  if (NON_RETRY_FAILURES.includes(failure)) return false;
  if (stage === "authentication" || stage === "rateLimiter") return false;

  const maxRetries =
    retryPolicy === "one"
      ? 1
      : retryPolicy === "exponential" || retryPolicy === "exponentialJitter"
        ? 3
        : 0;

  return retryCount < maxRetries;
}

export function computeBackoffMs(
  retryPolicy: RetryPolicy,
  retryCount: number,
  jitterSeed = 0.5,
): number {
  if (retryPolicy === "none" || retryPolicy === "one") {
    return retryPolicy === "one" ? 120 : 0;
  }
  const base = 100 * 2 ** retryCount;
  if (retryPolicy === "exponentialJitter") {
    return base + Math.floor(jitterSeed * 50);
  }
  return base;
}

export function stageDuration(
  stage: PipelineStage,
  config: SimulationConfig,
  motionScale = 1,
): number {
  let ms = BASE_DURATIONS[stage] * slowMultiplier(config.requestMode);
  if (config.requestMode === "write" && stage === "database") {
    ms *= 1.25;
  }
  return Math.max(8, Math.round(ms * motionScale));
}

function readMotionScale(): number {
  if (typeof window === "undefined") return 1;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0.2
    : 1;
}

export function httpStatusForFailure(
  stage: PipelineStage,
  failure: FailureInjection,
): { status: number; text: string } {
  if (failure === "auth") return { status: 401, text: "Unauthorized" };
  if (failure === "rateLimit") return { status: 429, text: "Too Many Requests" };
  if (failure === "network") return { status: 503, text: "Service Unavailable" };
  if (failure === "dbTimeout" || stage === "database") {
    return { status: 504, text: "Gateway Timeout" };
  }
  if (failure === "cacheUnavailable") {
    return { status: 502, text: "Bad Gateway" };
  }
  return { status: 500, text: "Internal Server Error" };
}

type InternalRequest = {
  id: string;
  burstIndex: number;
  config: SimulationConfig;
  trace: TraceEntry[];
  activeTraceId: string | null;
  nodeStates: Record<PipelineStage, NodeVisualState>;
  stageLatencies: Partial<Record<PipelineStage, number>>;
  retryCount: number;
  stageAttempts: Partial<Record<PipelineStage, number>>;
  cacheResult: CacheResult;
  failedAt: PipelineStage | null;
  cancelled: boolean;
  completed: boolean;
  success: boolean;
  httpStatus: number;
  statusText: string;
  totalLatencyMs: number;
  currentStage: PipelineStage | null;
  stageStartedAt: number;
  runStartedAt: number;
  pendingTimer: ReturnType<typeof setTimeout> | null;
};

function emptyNodeStates(): Record<PipelineStage, NodeVisualState> {
  return PIPELINE_STAGES.reduce(
    (acc, stage) => {
      acc[stage] = "idle";
      return acc;
    },
    {} as Record<PipelineStage, NodeVisualState>,
  );
}

function formatTraceTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const millis = ms % 1000;
  return `${String(seconds).padStart(2, "0")}:${String(millis).padStart(3, "0")}`;
}

export { formatTraceTime };

export class RequestFlowSimulation {
  private config: SimulationConfig = DEFAULT_SIMULATION_CONFIG;
  private lastConfig: SimulationConfig = DEFAULT_SIMULATION_CONFIG;
  private callbacks: SimulationCallbacks | null = null;
  private requests: InternalRequest[] = [];
  private running = false;
  private disposed = false;
  private masterTimer: ReturnType<typeof setTimeout> | null = null;
  private burstStaggerMs = 55;

  subscribe(callbacks: SimulationCallbacks) {
    this.callbacks = callbacks;
    this.emitSnapshot();
    return () => {
      this.callbacks = null;
    };
  }

  dispose() {
    this.disposed = true;
    this.clearTimers();
    this.callbacks = null;
  }

  getLastConfig() {
    return this.lastConfig;
  }

  reset() {
    this.clearTimers();
    this.requests = [];
    this.running = false;
    this.emitSnapshot();
  }

  cancel() {
    for (const req of this.requests) {
      if (!req.completed) {
        req.cancelled = true;
        req.completed = true;
        req.success = false;
        req.httpStatus = 499;
        req.statusText = "Client Closed Request";
        req.totalLatencyMs = performance.now() - req.runStartedAt;
        if (req.currentStage) {
          req.nodeStates[req.currentStage] = "cancelled";
          this.pushTrace(req, req.currentStage, "Request cancelled", "cancel", null);
        }
      }
      this.clearRequestTimer(req);
    }
    this.running = false;
    this.emitSnapshot();
    this.emitComplete();
  }

  replayLast() {
    this.start(this.lastConfig);
  }

  start(config: SimulationConfig = this.config) {
    this.reset();
    this.config = config;
    this.lastConfig = config;
    this.running = true;

    const count = trafficCount(config.traffic);
    this.requests = Array.from({ length: count }, (_, index) =>
      this.createRequest(config, index),
    );

    this.emitSnapshot();

    for (const req of this.requests) {
      const delay = req.burstIndex * this.burstStaggerMs;
      req.pendingTimer = setTimeout(() => {
        if (this.disposed) return;
        this.runRequest(req);
      }, delay);
    }
  }

  private createRequest(config: SimulationConfig, index: number): InternalRequest {
    const id = nextId(`req-${index}`);
    return {
      id,
      burstIndex: index,
      config,
      trace: [],
      activeTraceId: null,
      nodeStates: emptyNodeStates(),
      stageLatencies: {},
      retryCount: 0,
      cacheResult: "n/a",
      failedAt: null,
      cancelled: false,
      completed: false,
      success: false,
      httpStatus: 0,
      statusText: "",
      totalLatencyMs: 0,
      currentStage: null,
      stageStartedAt: 0,
      runStartedAt: performance.now(),
      pendingTimer: null,
      stageAttempts: {},
    };
  }

  private shouldFailAt(req: InternalRequest, stage: PipelineStage): boolean {
    const failAt = failureStage(req.config.failureInjection);
    if (failAt !== stage) return false;
    const attempts = req.stageAttempts[stage] ?? 0;
    return attempts === 0;
  }

  private clearTimers() {
    if (this.masterTimer) {
      clearTimeout(this.masterTimer);
      this.masterTimer = null;
    }
    for (const req of this.requests) {
      this.clearRequestTimer(req);
    }
  }

  private clearRequestTimer(req: InternalRequest) {
    if (req.pendingTimer) {
      clearTimeout(req.pendingTimer);
      req.pendingTimer = null;
    }
  }

  private pushTrace(
    req: InternalRequest,
    stage: PipelineStage,
    event: string,
    status: TraceStatus,
    stageLatencyMs: number | null,
  ) {
    const timestampMs = Math.round(performance.now() - req.runStartedAt);
    const entry: TraceEntry = {
      id: nextId("trace"),
      requestId: req.id,
      timestampMs,
      stage,
      event,
      status,
      stageLatencyMs,
    };
    req.trace.push(entry);
    req.activeTraceId = entry.id;
    this.emitSnapshot();
  }

  private setNode(
    req: InternalRequest,
    stage: PipelineStage,
    state: NodeVisualState,
  ) {
    req.nodeStates[stage] = state;
    req.currentStage = stage;
    this.emitSnapshot();
  }

  private runRequest(req: InternalRequest) {
    if (req.completed || req.cancelled || this.disposed) return;
    this.pushTrace(req, "client", "Request created", "info", null);
    this.advanceStage(req, 0);
  }

  private advanceStage(req: InternalRequest, stageIndex: number) {
    if (req.completed || req.cancelled || this.disposed) return;

    const stage = PIPELINE_STAGES[stageIndex];
    if (!stage) {
      this.finishSuccess(req);
      return;
    }

    const config = req.config;
    const failAt = failureStage(config.failureInjection);
    req.stageStartedAt = performance.now();
    this.setNode(req, stage, stageIndex === 0 ? "active" : "waiting");

    for (let i = 0; i < stageIndex; i++) {
      const prev = PIPELINE_STAGES[i];
      if (
        req.nodeStates[prev] !== "failed" &&
        req.nodeStates[prev] !== "cancelled" &&
        req.nodeStates[prev] !== "skipped"
      ) {
        req.nodeStates[prev] = "passed";
      }
    }

    this.setNode(req, stage, "active");
    this.pushTrace(
      req,
      stage,
      `${STAGE_LABELS[stage]} started`,
      "info",
      null,
    );

    const duration = stageDuration(stage, config, readMotionScale());

    req.pendingTimer = setTimeout(() => {
      if (req.completed || req.cancelled || this.disposed) return;
      this.completeStage(req, stageIndex, stage, failAt);
    }, duration);
  }

  private completeStage(
    req: InternalRequest,
    stageIndex: number,
    stage: PipelineStage,
    failAt: PipelineStage | null,
  ) {
    const latency = Math.round(performance.now() - req.stageStartedAt);
    req.stageLatencies[stage] = latency;

    if (stage === "cache") {
      this.handleCacheStage(req, stageIndex, latency, failAt);
      return;
    }

    if (stage === "database") {
      this.handleDatabaseStage(req, stageIndex, latency, failAt);
      return;
    }

    if (this.shouldFailAt(req, stage)) {
      this.handleFailure(req, stage, latency);
      return;
    }

    this.pushTrace(
      req,
      stage,
      `${STAGE_LABELS[stage]} passed`,
      "ok",
      latency,
    );
    req.nodeStates[stage] = "passed";

    if (stage === "response") {
      this.finishSuccess(req);
      return;
    }

    this.advanceStage(req, stageIndex + 1);
  }

  private handleCacheStage(
    req: InternalRequest,
    stageIndex: number,
    latency: number,
    failAt: PipelineStage | null,
  ) {
    const { config } = req;

    if (config.cacheBehavior === "disabled") {
      req.cacheResult = "skipped";
      req.nodeStates.cache = "skipped";
      this.pushTrace(req, "cache", "Cache skipped", "skip", latency);
      this.advanceStage(req, stageIndex + 1);
      return;
    }

    if (failAt === "cache" && config.failureInjection === "cacheUnavailable") {
      req.cacheResult = "unavailable";
      req.nodeStates.cache = "failed";
      this.pushTrace(req, "cache", "Cache unavailable", "warn", latency);
      this.pushTrace(req, "cache", "Fallback to database", "info", null);
      this.advanceStage(req, stageIndex + 1);
      return;
    }

    const hit = resolveCacheHit(config.requestMode, config.cacheBehavior);
    if (hit) {
      req.cacheResult = "hit";
      req.nodeStates.cache = "cacheHit";
      this.pushTrace(req, "cache", "Cache hit", "ok", latency);
      req.nodeStates.database = "skipped";
      this.advanceStage(req, PIPELINE_STAGES.indexOf("response"));
      return;
    }

    req.cacheResult = "miss";
    req.nodeStates.cache = "cacheMiss";
    this.pushTrace(req, "cache", "Cache miss", "warn", latency);
    this.advanceStage(req, stageIndex + 1);
  }

  private handleDatabaseStage(
    req: InternalRequest,
    stageIndex: number,
    latency: number,
    failAt: PipelineStage | null,
  ) {
    if (req.nodeStates.database === "skipped") return;

    if (
      failAt === "database" &&
      req.config.failureInjection === "dbTimeout" &&
      this.shouldFailAt(req, "database")
    ) {
      req.nodeStates.database = "timedOut";
      this.pushTrace(req, "database", "Database timeout", "error", latency);
      this.handleFailure(req, "database", latency);
      return;
    }

    if (this.shouldFailAt(req, "database")) {
      this.handleFailure(req, "database", latency);
      return;
    }

    this.pushTrace(req, "database", "Database responded", "ok", latency);
    req.nodeStates.database = "passed";
    this.advanceStage(req, stageIndex + 1);
  }

  private handleFailure(
    req: InternalRequest,
    stage: PipelineStage,
    latency: number,
  ) {
    const { config } = req;
    const failure = config.failureInjection;

    if (canRetryFailure(failure, stage, config.retryPolicy, req.retryCount)) {
      req.retryCount += 1;
      req.stageAttempts[stage] = (req.stageAttempts[stage] ?? 0) + 1;
      req.nodeStates[stage] = "retrying";
      const backoff = computeBackoffMs(
        config.retryPolicy,
        req.retryCount - 1,
        Math.random(),
      );
      this.pushTrace(
        req,
        stage,
        `Retry scheduled (+${backoff}ms)`,
        "warn",
        latency,
      );

      req.pendingTimer = setTimeout(() => {
        if (req.completed || req.cancelled || this.disposed) return;
        this.setNode(req, stage, "active");
        this.pushTrace(req, stage, "Retry attempt", "info", null);
        const duration = stageDuration(stage, config, readMotionScale());
        req.stageStartedAt = performance.now();
        req.pendingTimer = setTimeout(() => {
          if (req.completed || req.cancelled || this.disposed) return;
          this.completeStage(
            req,
            PIPELINE_STAGES.indexOf(stage),
            stage,
            failureStage(failure),
          );
        }, duration);
      }, backoff);
      return;
    }

    this.finalizeFailure(req, stage, latency);
  }

  private finalizeFailure(req: InternalRequest, stage: PipelineStage, latency: number) {
    const { status, text } = httpStatusForFailure(stage, req.config.failureInjection);
    req.failedAt = stage;
    req.success = false;
    req.httpStatus = status;
    req.statusText = text;
    req.nodeStates[stage] =
      req.config.failureInjection === "dbTimeout" && stage === "database"
        ? "timedOut"
        : "failed";
    this.pushTrace(
      req,
      stage,
      `${STAGE_LABELS[stage]} failed`,
      "error",
      latency,
    );
    this.finishRequest(req);
  }

  private finishSuccess(req: InternalRequest) {
    req.success = true;
    req.httpStatus = 200;
    req.statusText = "OK";
    req.failedAt = null;
    for (const stage of PIPELINE_STAGES) {
      if (req.nodeStates[stage] === "idle" || req.nodeStates[stage] === "waiting") {
        req.nodeStates[stage] = "passed";
      }
    }
    if (req.cacheResult === "n/a" && req.config.cacheBehavior !== "disabled") {
      req.cacheResult = "miss";
    }
    this.pushTrace(req, "response", "Response completed", "ok", req.stageLatencies.response ?? null);
    this.finishRequest(req);
  }

  private finishRequest(req: InternalRequest) {
    req.completed = true;
    req.totalLatencyMs = Math.round(performance.now() - req.runStartedAt);
    req.activeTraceId = null;

    const allDone = this.requests.every((r) => r.completed);
    this.emitSnapshot();
    if (allDone) {
      this.running = false;
      this.emitComplete();
    }
  }

  private buildNodeSnapshots(): NodeSnapshot[] {
    const stageCounts: Record<PipelineStage, number> = PIPELINE_STAGES.reduce(
      (acc, stage) => {
        acc[stage] = 0;
        return acc;
      },
      {} as Record<PipelineStage, number>,
    );

    const dominant: Record<PipelineStage, NodeVisualState> = emptyNodeStates();

    for (const req of this.requests) {
      for (const stage of PIPELINE_STAGES) {
        const state = req.nodeStates[stage];
        if (state !== "idle") {
          stageCounts[stage] += 1;
          dominant[stage] = pickDominantState(dominant[stage], state);
        }
      }
    }

    return PIPELINE_STAGES.map((stage) => ({
      stage,
      state: this.requests.length ? dominant[stage] : "idle",
      requestCount: stageCounts[stage],
    }));
  }

  private buildTrace(): TraceEntry[] {
    const merged = this.requests.flatMap((r) => r.trace);
    merged.sort((a, b) => a.timestampMs - b.timestampMs);
    const cap = this.config.traffic === "burst20" ? 80 : 120;
    return merged.slice(-cap);
  }

  private buildActiveTraceId(): string | null {
    for (let i = this.requests.length - 1; i >= 0; i--) {
      const id = this.requests[i]?.activeTraceId;
      if (id) return id;
    }
    return null;
  }

  private toRunResult(req: InternalRequest): RequestRunResult {
    return {
      requestId: req.id,
      httpStatus: req.httpStatus,
      statusText: req.statusText,
      totalLatencyMs: req.totalLatencyMs,
      cacheResult: req.cacheResult,
      retryCount: req.retryCount,
      completedStages: Object.keys(req.stageLatencies).length,
      failedAt: req.failedAt,
      success: req.success,
      stageLatencies: req.stageLatencies,
      cancelled: req.cancelled,
    };
  }

  private buildAggregate(): AggregateResult | null {
    if (!this.requests.length) return null;
    const runs = this.requests.map((r) => this.toRunResult(r));
    const last = runs[runs.length - 1]!;
    const successRuns = runs.filter((r) => r.success);
    const failedRuns = runs.filter((r) => !r.success && !r.cancelled);
    const cancelledRuns = runs.filter((r) => r.cancelled);

    const stageLatencies: Partial<Record<PipelineStage, number>> = {};
    for (const stage of PIPELINE_STAGES) {
      const values = runs
        .map((r) => r.stageLatencies[stage])
        .filter((v): v is number => typeof v === "number");
      if (values.length) {
        stageLatencies[stage] = Math.round(
          values.reduce((a, b) => a + b, 0) / values.length,
        );
      }
    }

    const primary = successRuns[0] ?? failedRuns[0] ?? last;

    return {
      runs,
      requestsCompleted: successRuns.length,
      requestsFailed: failedRuns.length + cancelledRuns.length,
      totalLatencyMs: Math.max(...runs.map((r) => r.totalLatencyMs)),
      httpStatus: primary.httpStatus,
      statusText: primary.statusText,
      cacheResult: primary.cacheResult,
      retryCount: runs.reduce((n, r) => n + r.retryCount, 0),
      completedStages: primary.completedStages,
      failedAt: failedRuns[0]?.failedAt ?? null,
      success: failedRuns.length === 0 && cancelledRuns.length === 0,
      stageLatencies,
    };
  }

  private emitSnapshot() {
    if (!this.callbacks || this.disposed) return;
    const snapshot: SimulationSnapshot = {
      nodes: this.buildNodeSnapshots(),
      trace: this.buildTrace(),
      activeTraceId: this.buildActiveTraceId(),
      running: this.running,
      aggregate: this.buildAggregate(),
      burstActive: this.requests.filter((r) => !r.completed).length,
    };
    this.callbacks.onSnapshot(snapshot);
  }

  private emitComplete() {
    if (!this.callbacks || this.disposed) return;
    const aggregate = this.buildAggregate();
    if (aggregate) this.callbacks.onComplete(aggregate);
  }
}

const STATE_PRIORITY: Record<NodeVisualState, number> = {
  failed: 100,
  timedOut: 95,
  cancelled: 90,
  retrying: 80,
  active: 70,
  cacheHit: 60,
  cacheMiss: 55,
  waiting: 40,
  passed: 30,
  skipped: 25,
  idle: 0,
};

function pickDominantState(
  current: NodeVisualState,
  next: NodeVisualState,
): NodeVisualState {
  return STATE_PRIORITY[next] >= STATE_PRIORITY[current] ? next : current;
}

/** Deterministic cache resolution for tests and preview loops. */
export function resolveCacheHitSeeded(
  requestMode: RequestMode,
  cacheBehavior: CacheBehavior,
  seed: number,
): boolean {
  if (cacheBehavior === "disabled") return false;
  if (cacheBehavior === "forceHit") return true;
  if (cacheBehavior === "forceMiss") return false;
  if (requestMode === "cached") return true;
  if (requestMode === "write") return false;
  return seed % 3 !== 0;
}
