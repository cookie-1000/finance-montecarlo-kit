# finance-montecarlo-kit

Reusable Monte Carlo engine with portfolio metrics and parameterized scenario presets.

## Installation

```bash
npm install finance-montecarlo-kit
```

## Quick Start

```typescript
import { FinanceMontecarloKit } from "finance-montecarlo-kit";

const instance = new FinanceMontecarloKit();
const result = await instance.run();
console.log(result);
```

## Features

- Deterministic RNG seeding for reproducible runs
- Pluggable return models (normal, lognormal, bootstrapped)
- Built-in risk metrics (VaR, CVaR, drawdown, ruin probability)

## API Reference

### `FinanceMontecarloKit`

#### Constructor

```typescript
new FinanceMontecarloKit(options?: FinanceMontecarloKitOptions)
```

#### Methods

- `run()` - Execute the main operation. Returns `Promise<FinanceMontecarloKitResult>`.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build
npm run build

# Type check
npm run lint
```

## Publishing

1. Update version in `package.json`
2. Create a GitHub release with tag `v0.x.0`
3. The GitHub Action will automatically publish to npm

## License

MIT
