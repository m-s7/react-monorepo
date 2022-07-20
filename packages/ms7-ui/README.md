# BUI

React UI library based on boostrap.

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) to install.

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

To use this package you must include [bootstrap5](https://turborepo.org/docs/core-concepts/filtering) css and script in your top level html and top level js file.

TODO: mimify css

```js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'ms7/ui/dist/index.css'
```
