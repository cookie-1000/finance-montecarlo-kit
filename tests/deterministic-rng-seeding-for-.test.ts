import { describe, it, expect } from "vitest";
import { FinanceMontecarloKit, createSeededRNG } from "../src";
import { ValidationError } from "../src/errors";

describe("FinanceMontecarloKit - Deterministic RNG seeding", () => {
  it("should create an instance with default options", () => {
    const instance = new FinanceMontecarloKit();
    expect(instance).toBeDefined();
  });

  it("should accept custom options", () => {
    const instance = new FinanceMontecarloKit({ verbose: true });
    expect(instance).toBeDefined();
  });

  it("should produce deterministic random values for the same seed", async () => {
    const seed = "test-seed-123";
    const instance1 = new FinanceMontecarloKit({ feature1: { seed } });
    const instance2 = new FinanceMontecarloKit({ feature1: { seed } });
    const result1 = await instance1.run();
    const result2 = await instance2.run();
    expect(result1.data?.randomValue).toBe(result2.data?.randomValue);
    expect(result1.data?.seed).toBe(seed);
    // Risk metrics should be undefined for basic RNG test
    expect(result1.riskMetrics).toBeUndefined();
  });

  it("should produce different random values for different seeds", async () => {
    const instance1 = new FinanceMontecarloKit({ feature1: { seed: "seedA" } });
    const instance2 = new FinanceMontecarloKit({ feature1: { seed: "seedB" } });
    const result1 = await instance1.run();
    const result2 = await instance2.run();
    expect(result1.data?.randomValue).not.toBe(result2.data?.randomValue);
  });

  it("should use the default seed if none is provided", async () => {
    const instance = new FinanceMontecarloKit();
    const result = await instance.run();
    expect(result.data?.seed).toBe("finance-montecarlo-default-seed");
  });

  it("should throw ValidationError for empty string seed", async () => {
    const instance = new FinanceMontecarloKit({ feature1: { seed: "   " } });
    await expect(instance.run()).rejects.toThrow(ValidationError);
  });
});

describe("createSeededRNG", () => {
  it("should return a function that returns a number in [0,1)", () => {
    const rng = createSeededRNG("abc");
    const n = rng();
    expect(typeof n).toBe("number");
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThan(1);
  });

  it("should be deterministic for the same seed", () => {
    const rng1 = createSeededRNG("same-seed");
    const rng2 = createSeededRNG("same-seed");
    expect(rng1()).toBe(rng2());
  });

  it("should be different for different seeds", () => {
    const rng1 = createSeededRNG("seed1");
    const rng2 = createSeededRNG("seed2");
    expect(rng1()).not.toBe(rng2());
  });
});
