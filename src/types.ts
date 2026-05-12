/**
 * Configuration options for FinanceMontecarloKit.
 */
export interface FinanceMontecarloKitOptions {
  /**
   * Enable verbose logging for debugging.
   * @default false
   */
  verbose?: boolean;

  /**
   * Configuration for: Deterministic RNG seeding for reproducible runs
   */
  feature1?: Record<string, unknown>;

  /**
   * Configuration for: Pluggable return models (normal, lognormal, bootstrapped)
   */
  feature2?: Record<string, unknown>;

  /**
   * Configuration for: Built-in risk metrics (VaR, CVaR, drawdown, ruin probability)
   */
  feature3?: Record<string, unknown>;
}

/**
 * Result returned by FinanceMontecarloKit operations.
 */
export interface FinanceMontecarloKitResult<T = unknown> {
  /** Whether the operation succeeded. */
  success: boolean;
  /** The result data, if successful. */
  data?: T;
  /** Error message, if the operation failed. */
  error?: string;
}
