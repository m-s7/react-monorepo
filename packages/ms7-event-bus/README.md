# Event Bus

Event bus for JavaScript.

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

```ts
import EventBus from "@ms7/event-bus";

EventBus.register('channel')
EventBus.subscribre('channel', x => { /* do something */})

EventBus.dispatch('channel', 'message')

EventBus.unsubscribe('channel')
EventBus.unregister('channel')
```
