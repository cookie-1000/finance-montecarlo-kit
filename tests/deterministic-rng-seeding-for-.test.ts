import { describe, it, expect } from "vitest";
import { FinanceMontecarloKit } from "../src";

describe("FinanceMontecarloKit", () => {
  it("should create an instance with default options", () => {
    const instance = new FinanceMontecarloKit();
    expect(instance).toBeDefined();
  });

  it("should accept custom options", () => {
    const instance = new FinanceMontecarloKit({ verbose: true });
    expect(instance).toBeDefined();
  });

  it("should run successfully", async () => {
    const instance = new FinanceMontecarloKit();
    const result = await instance.run();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });
});
