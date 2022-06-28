# MS7 Codebase

Main codebase of MS7 project.

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

To run linter:
```bash
yarn lint
```

To remove apps and packages temp directories:
```bash
yarn clean
```

If you need more options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.

## Versioning

To add changes to changelog in apps and packages:
```bash
yarn changeset-create
```

To apply changes to changelog in apps and packages:
```bash
yarn changeset-apply
```

To publish changelog:
```bash
yarn release
```

## Deployment

#### Heroku

TODO: add heroku configuration!!!

Login to heroku:
```bash
heorku login
```

Deploy app:
```bash
git push heroku [branch name]:main
```

Open app:
```bash
heroku open
```

## Tools

#### ms7-merge

This tool is used for merging package.json files.

```bash
ms7-merge -l package.json -r ../../packages/assets/package-base-app.json
```