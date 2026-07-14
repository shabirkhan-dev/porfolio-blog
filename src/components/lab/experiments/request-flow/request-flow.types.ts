export const PIPELINE_STAGES = [
  "client",
  "gateway",
  "authentication",
  "rateLimiter",
  "service",
  "cache",
  "database",
  "response",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export const STAGE_LABELS: Record<PipelineStage, string> = {
  client: "Client",
  gateway: "Gateway",
  authentication: "Authentication",
  rateLimiter: "Rate Limiter",
  service: "Service",
  cache: "Cache",
  database: "Database",
  response: "Response",
};

export type NodeVisualState =
  | "idle"
  | "waiting"
  | "active"
  | "passed"
  | "failed"
  | "timedOut"
  | "retrying"
  | "cacheHit"
  | "cacheMiss"
  | "skipped"
  | "cancelled";

export type RequestMode = "standard" | "cached" | "write" | "slow";
export type CacheBehavior = "automatic" | "forceHit" | "forceMiss" | "disabled";
export type FailureInjection =
  | "none"
  | "auth"
  | "rateLimit"
  | "service"
  | "cacheUnavailable"
  | "dbTimeout"
  | "network";
export type RetryPolicy = "none" | "one" | "exponential" | "exponentialJitter";
export type TrafficMode = "single" | "burst5" | "burst20";

export type SimulationConfig = {
  requestMode: RequestMode;
  cacheBehavior: CacheBehavior;
  failureInjection: FailureInjection;
  retryPolicy: RetryPolicy;
  traffic: TrafficMode;
};

export const DEFAULT_SIMULATION_CONFIG: SimulationConfig = {
  requestMode: "standard",
  cacheBehavior: "automatic",
  failureInjection: "none",
  retryPolicy: "none",
  traffic: "single",
};

export type TraceStatus = "ok" | "warn" | "error" | "info" | "skip" | "cancel";

export type TraceEntry = {
  id: string;
  requestId: string;
  timestampMs: number;
  stage: PipelineStage;
  event: string;
  status: TraceStatus;
  stageLatencyMs: number | null;
};

export type CacheResult = "hit" | "miss" | "skipped" | "unavailable" | "n/a";

export type RequestRunResult = {
  requestId: string;
  httpStatus: number;
  statusText: string;
  totalLatencyMs: number;
  cacheResult: CacheResult;
  retryCount: number;
  completedStages: number;
  failedAt: PipelineStage | null;
  success: boolean;
  stageLatencies: Partial<Record<PipelineStage, number>>;
  cancelled: boolean;
};

export type AggregateResult = {
  runs: RequestRunResult[];
  requestsCompleted: number;
  requestsFailed: number;
  totalLatencyMs: number;
  httpStatus: number;
  statusText: string;
  cacheResult: CacheResult;
  retryCount: number;
  completedStages: number;
  failedAt: PipelineStage | null;
  success: boolean;
  stageLatencies: Partial<Record<PipelineStage, number>>;
};

export type NodeSnapshot = {
  stage: PipelineStage;
  state: NodeVisualState;
  requestCount: number;
  label?: string;
};

export type SimulationSnapshot = {
  nodes: NodeSnapshot[];
  trace: TraceEntry[];
  activeTraceId: string | null;
  running: boolean;
  aggregate: AggregateResult | null;
  burstActive: number;
};

export type SimulationCallbacks = {
  onSnapshot: (snapshot: SimulationSnapshot) => void;
  onComplete: (result: AggregateResult) => void;
};

export type SourceFileEntry = {
  path: string;
  name: string;
  language: string;
  content: string;
};
