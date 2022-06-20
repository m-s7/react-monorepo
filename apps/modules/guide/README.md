# Core

MS7 Index module.

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

To build in development mode:
```bash
yarn dev
```

To start server in development mode:
```bash
yarn standalone
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

This is a module app, it can work in two modes, standalone and as a module for parent app.

### Standalone

Standalone mode does not have menu, styles and initialized store (these must be provided by parent app).

Tu run standalone mode:
```bash
yarn standalone
```

### Module

Parent app must provide:
- layout
- font awesome icons
- environmental variables
- react router (BrowserRouter)
- configured webpack aliases (for development)

Optionally parent may provide:
- logger instance
- auth provider
- error boundary component

####React router info
Since redux allows only one instance of store per app, parent store must be initialized using react context, see example below.

##### Example

#####webpack.config.js

```js
module.exports = {
    resolve: {
        alias: {
            'Index': '../modules/guide/src',
            'Index/*': '../modules/guide/src/*',
        },
    },

}
```

#####tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "Index": ["../modules/guide/src/"],
      "Index/*": ["../modules/guide/src/*"]
    }
  }
}
```

#####index.tsx

```tsx
import React from 'react'
import { RootState } from '@/store/store'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactReduxContextValue } from 'react-redux'
import { logging, assignLevelToLoggers, getLogLevelForEnv } from '@ms7/logger'

// create react context instance
export const CoreStoreContext = React.createContext<ReactReduxContextValue<RootState>>({} as any)

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
    <BrowserRouter>
        // app component
    </BrowserRouter>
)
```

#####store.ts

```ts
import { AnyAction, configureStore } from '@reduxjs/toolkit'
import ApiService, { restReducer } from '@ms7/restful-redux'

export const store = configureStore({
    reducer: { rest: restReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

ApiService.setStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
```

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
