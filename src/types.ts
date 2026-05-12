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
   * @example
   * ```typescript
   * { seed: "my-seed-string" }
   * ```
   */
  feature1?: {
    /**
     * Seed for deterministic random number generation.
     * If omitted, a default seed is used.
     */
    seed?: string;
  };

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
/**
 * Result returned by FinanceMontecarloKit operations.
 *
 * @template T - The type of the main result data.
 *
 * @example
 * ```typescript
 * type Result = FinanceMontecarloKitResult<PortfolioSimulationResult>;
 * ```
 */
export interface FinanceMontecarloKitResult<T = unknown> {
  /** Whether the operation succeeded. */
  success: boolean;
  /** The result data, if successful. */
  data?: T;
  /** Error message, if the operation failed. */
  error?: string;
  /**
   * Detailed risk metrics from the simulation, if available.
   * Includes Value at Risk (VaR), Conditional VaR (CVaR),
   * maximum drawdown, and ruin probability.
   */
  riskMetrics?: RiskMetrics;
}

/**
 * Detailed risk metrics for a Monte Carlo simulation result.
 */
export interface RiskMetrics {
  /** Value at Risk at the specified confidence level (e.g., 95%). */
  var: number;
  /** Conditional Value at Risk (expected shortfall) at the same confidence level. */
  cvar: number;
  /** Maximum drawdown observed in the simulation. */
  maxDrawdown: number;
  /** Probability of portfolio ruin (ending below a threshold). */
  ruinProbability: number;
  /** The confidence level used for VaR/CVaR, e.g., 0.95 for 95%. */
  confidenceLevel: number;
}

