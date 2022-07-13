# Core

MS7 module with examples of core features.

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

Module in standalone mode does not contain layout, components are styled by style inherited from packages.

Tu run standalone mode:
```bash
yarn standalone
```

### Module

Parent app must:
- provide environmental variables
- provide react router (BrowserRouter)
- provide configured webpack aliases (for development mode)
- injected entrypoint component inside parent router

Optionally parent may provide:
- layout
- auth provider
- font awesome icons

Parent component may not:
- include redux store instance (child store will override parent store)

##### Example configuration

##### webpack.config.js

```js
module.exports = {
    resolve: {
        alias: {
            'Core': '../modules/core/src',
            'Core/*': '../modules/core/src/*',
        },
    },

}
```

##### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "Core": ["../modules/core/src/"],
      "Core/*": ["../modules/core/src/*"]
    }
  }
}
```

##### index.tsx

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ParentRouter from '@/ParentRouter'
import layout from '@/layouts'
import Entrypoint from 'Core/entrypoint'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <BrowserRouter>
        <ParentRouter />
        <Entrypoint parentLayout={layout} />
    </BrowserRouter>
)
```

##### app.tsx

Valid when parent (or self) provides AuthProviderContext.

```tsx
import React, { useContext, useLayoutEffect } from 'react'
import AppRouter from 'Core/app-router'
import { useAppDispatch } from 'Core/hooks/use-app-dispatch'
import { AuthProviderContext, setToken, setUsername, setLogoutUrl } from '@ms7/auth-providers'
import { EntrypointComponentProps } from '@ms7/router'

const App = (props: EntrypointComponentProps) => {
    const dispatch = useAppDispatch()
    const context = useContext(AuthProviderContext)

    useLayoutEffect(() => {
        if(context) {
            const token = context.getToken()
            const logoutUrl = context.getLogoutUrl()

            dispatch(setToken(token))
            dispatch(setLogoutUrl(logoutUrl))
            dispatch(setUsername(context.getUserInfo().username))
        }
    }, [])
    
    return (<AppRouter parentLayout={props.parentLayout} />)
}

export default App
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
