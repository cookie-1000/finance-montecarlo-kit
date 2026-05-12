import type { FinanceMontecarloKitOptions, FinanceMontecarloKitResult } from "./types";

/**
 * FinanceMontecarloKit - Reusable Monte Carlo engine with portfolio metrics and parameterized scenario presets.
 *
 * @example
 * ```typescript
 * import { FinanceMontecarloKit } from "finance-montecarlo-kit";
 *
 * const instance = new FinanceMontecarloKit();
 * const result = await instance.run();
 * console.log(result);
 * ```
 */
export class FinanceMontecarloKit {
  private options: FinanceMontecarloKitOptions;

  constructor(options: FinanceMontecarloKitOptions = {}) {
    this.options = options;
  }

  /**
   * Execute the main operation.
   */
  async run(): Promise<FinanceMontecarloKitResult> {
    // Deterministic RNG seeding for reproducible runs
    const seed = this.getSeed();
    const rng = createSeededRNG(seed);
    // Example: generate a random number to demonstrate determinism
    const randomValue = rng();

    return {
      success: true,
      data: {
        message: "FinanceMontecarloKit is working!",
        randomValue,
        seed,
      },
    };
  }

  /**
   * Get the RNG seed from options or generate a default.
   * Throws ValidationError if the seed is invalid.
   */
  private getSeed(): string {
    const feature1 = this.options.feature1 as { seed?: string } | undefined;
    let seed = feature1?.seed;
    if (seed === undefined || seed === null) {
      // Default: use a fixed string for reproducibility if not provided
      seed = "finance-montecarlo-default-seed";
    }
    if (typeof seed !== "string" || seed.trim() === "") {
      // Use custom error class
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ValidationError } = require("./errors");
      throw new ValidationError("RNG seed must be a non-empty string");
    }
    return seed;
  }
}

/**
 * Create a deterministic seeded RNG function (Mulberry32 algorithm).
 *
 * @param seed - Any string seed
 * @returns Function that returns a float in [0, 1)
 *
 * @example
 * ```typescript
 * const rng = createSeededRNG("my-seed");
 * const n = rng(); // 0.123...
 * ```
 */
export function createSeededRNG(seed: string): () => number {
  // Mulberry32 PRNG, seeded by string hash
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return function rng() {
    h += h << 13; h ^= h >>> 7;
    h += h << 3; h ^= h >>> 17;
    h += h << 5;
    return ((h >>> 0) / 4294967296);
  };
}
