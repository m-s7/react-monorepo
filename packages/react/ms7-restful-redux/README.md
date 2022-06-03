# Restful Redux

Service for restful api calls using redux reducer and axios

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

If you need more build options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.

## Usage

```js
ApiService.setStore(store)

// optional
ApiService.setupApiServiceInterceptors(token, logoutFunction)
```

###Example

```ts
// store.ts
import ApiService from '@ms7/restful-redux'
import { restReducer } from '@ms7/restful-redux'
import { AxiosResponse } from "axios";

const store = configureStore({
    reducer: { rest: restReducer },
})

ApiService.setStore(store)

// example.ts
interface User {
    readonly id: number,
    name: string,
    age: number
}

interface UserBody {
    name: string,
    age: number
}

const getUser = async (id: number) => await get<User>('https://localhost:9999/users/1')
const postUser = async (body: UserBody) => await post<User, typeof body>('https://localhost:9999/users', body)
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

If you need more build options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.
