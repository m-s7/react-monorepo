# MS7 React-Monorepo

Main codebase of MS7 project.

This project is a set of libraries aimed at familiarizing novice programmers with setting up React in a monorepo environment.

This codebase requires multiple services (keycloak, firebase, websocket server, gql and rest backend) to work properly (not included).

This is not a production code.

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

## GraphQl Types Generator

To generate graphql types:

```bash
yarn graphql-generate
```

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

Merge:
```bash
ms7-merge -l package.json -r ../../packages/assets/package-base-app.json
```
