/**
 * Custom error classes for finance-montecarlo-kit.
 */

/**
 * Base error class for all FinanceMontecarloKit errors.
 */
export class FinanceMontecarloKitError extends Error {
  /** Machine-readable error code. */
  readonly code: string;

  constructor(message: string, code = "FINANCEMONTECARLOKIT_ERROR") {
    super(message);
    this.name = "FinanceMontecarloKitError";
    this.code = code;
  }
}

/**
 * Raised when the SDK is misconfigured.
 */
export class ConfigurationError extends FinanceMontecarloKitError {
  constructor(message: string) {
    super(message, "CONFIGURATION_ERROR");
    this.name = "ConfigurationError";
  }
}

/**
 * Raised when input validation fails.
 */
export class ValidationError extends FinanceMontecarloKitError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

/**
 * Raised when an operation exceeds its time limit.
 */
export class TimeoutError extends FinanceMontecarloKitError {
  constructor(message: string) {
    super(message, "TIMEOUT_ERROR");
    this.name = "TimeoutError";
  }
}
