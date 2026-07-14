import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  canRetryFailure,
  computeBackoffMs,
  failureStage,
  httpStatusForFailure,
  resolveCacheHitSeeded,
  stageDuration,
} from "./simulation-engine";
import { DEFAULT_SIMULATION_CONFIG } from "./request-flow.types";

describe("resolveCacheHitSeeded", () => {
  it("respects force hit and force miss", () => {
    assert.equal(resolveCacheHitSeeded("standard", "forceHit", 0), true);
    assert.equal(resolveCacheHitSeeded("standard", "forceMiss", 0), false);
    assert.equal(resolveCacheHitSeeded("standard", "disabled", 0), false);
  });

  it("cached mode always hits", () => {
    assert.equal(resolveCacheHitSeeded("cached", "automatic", 99), true);
  });

  it("write mode always misses", () => {
    assert.equal(resolveCacheHitSeeded("write", "automatic", 1), false);
  });
});

describe("failureStage", () => {
  it("maps injection keys to pipeline stages", () => {
    assert.equal(failureStage("auth"), "authentication");
    assert.equal(failureStage("rateLimit"), "rateLimiter");
    assert.equal(failureStage("service"), "service");
    assert.equal(failureStage("dbTimeout"), "database");
    assert.equal(failureStage("network"), "gateway");
    assert.equal(failureStage("none"), null);
  });
});

describe("canRetryFailure", () => {
  it("never retries auth failures", () => {
    assert.equal(
      canRetryFailure("auth", "authentication", "exponential", 0),
      false,
    );
  });

  it("never retries rate limit failures", () => {
    assert.equal(
      canRetryFailure("rateLimit", "rateLimiter", "one", 0),
      false,
    );
  });

  it("allows one retry for service errors", () => {
    assert.equal(canRetryFailure("service", "service", "one", 0), true);
    assert.equal(canRetryFailure("service", "service", "one", 1), false);
  });

  it("respects none policy", () => {
    assert.equal(canRetryFailure("service", "service", "none", 0), false);
  });
});

describe("computeBackoffMs", () => {
  it("returns fixed delay for one retry", () => {
    assert.equal(computeBackoffMs("one", 0), 120);
  });

  it("doubles for exponential backoff", () => {
    assert.equal(computeBackoffMs("exponential", 0), 100);
    assert.equal(computeBackoffMs("exponential", 1), 200);
    assert.equal(computeBackoffMs("exponential", 2), 400);
  });

  it("adds jitter within range", () => {
    const delay = computeBackoffMs("exponentialJitter", 1, 1);
    assert.equal(delay, 200 + 50);
  });
});

describe("stageDuration", () => {
  it("slow mode increases duration", () => {
    const base = stageDuration("gateway", DEFAULT_SIMULATION_CONFIG);
    const slow = stageDuration("gateway", {
      ...DEFAULT_SIMULATION_CONFIG,
      requestMode: "slow",
    });
    assert.ok(slow > base);
  });
});

describe("httpStatusForFailure", () => {
  it("returns expected status codes", () => {
    assert.deepEqual(httpStatusForFailure("authentication", "auth"), {
      status: 401,
      text: "Unauthorized",
    });
    assert.deepEqual(httpStatusForFailure("rateLimiter", "rateLimit"), {
      status: 429,
      text: "Too Many Requests",
    });
    assert.deepEqual(httpStatusForFailure("database", "dbTimeout"), {
      status: 504,
      text: "Gateway Timeout",
    });
  });
});
