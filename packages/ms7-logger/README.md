# Logger

Logger for JavaScript.

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) to install codebase.

```bash
yarn install
```

## Scripts

To run test suite:
```bash
yarn test
```

To build:
```bash
yarn build
```

To run linter:
```bash
yarn lint
```

To remove apps and packages temp directories:
```bash
yarn clean
```

If you need more options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.

## Usage

```ts
import {logging, LogLevel} from '@ms7/logger'

// initialize logger
logging.configure({minLevels: assignLevelToLoggers(['', 'core'], LogLevel.INFO)}).registerConsoleLogger()

// log message
const logger = logging.getLogger('core')
logger.info('message', ['some', 'data'])

// update logger configuration
logging.addConfigurationOption({ minLevels: { 'module': LogLevel.ERROR }})
```
