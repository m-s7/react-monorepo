# Core

Core app created using react.

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

To build apps and packages:
```bash
yarn build
```

To start server in development mode:
```bash
yarn dev
```

To start server in production mode:
```bash
yarn prod
```

If you need more build options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.

## Injecting environmental variables

After building static files you can inject env variables allowing for quick deployment with multiple configurations.

To inject env variables:
```bash
[env variables] npx react-inject-env set
```

Example:
```bash
REACT_APP_TITLE="injected env" REACT_APP_COLOR=green npm react-inject-env set
```

If you need additional inject options check official docs [react-inject-env](https://github.com/codegowhere/react-inject-env).
