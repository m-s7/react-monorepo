# Rest Builder

Simple JavaScript library for building api endpoints.

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

##### Create Api

```ts
import { logging } from '@ms7/logger'
import { createBaseQuery, createApi, combineHeaders } from '@ms7/rest-builder'

interface User {
    readonly id: number,
    name: string,
    age: number,
}

const baseQuery = createBaseQuery({
    baseUrl: 'http://localhost/',
    prepareHeaders: apiHeaders => {
        const headers = new Headers()
        headers.set('My-Header', 'Some-Value')

        combineHeaders(apiHeaders, headers)

        return apiHeaders
    },
    errorHandler: status => {
        if(status === 401) {
            //logout user
        }
    },
    logger: logging.getLogger('rest'),
    loggerConfig: { params: true },
})

const api = createApi({
    baseQuery,
    endpoints: builder => ({
        getUser: (id: number) => builder.query<User>({
            url: `users/${id}`,
        }),
        createUser: (data: Omit<User, 'id'>) => builder.mutation<User, typeof data>({
            url: 'users',
            method: 'POST',
            data,
            transformResponse: response => response.data,
        }),
        updateUser: ({ id, ...data }: User) => builder.mutation<User, typeof data>({
            url: `users/${id}`,
            method: 'PUT',
            data,
            transformResponse: response => response.data,
        }),
    }),
})

export const { getUser, createUser, updateUser } = api.endpoints
```

##### Use Api

```tsx
import { getUser, createUser, updateUser } from 'Core/api/rq-user-api'

const Component = () => {
    getUser(1)
        .then(user => { console.log(user) })
        .catch(error => { console.error(error) })

    createUser({ name: 'John', age: 35 })
        .then(user => { console.log(user) })
        .catch(error => { console.error(error) })

    updateUser({ id: 1, name: 'Mary', age: 26 })
        .then(user => { console.log(user) })
        .catch(error => { console.error(error) })

    return (<></>)
}
```

#### Use Loading Indicator Hook

This library provides a simple hook which returns **false** if api is idle and **true** is api is loading data.

```tsx
import { useApiIsLoading } from '@ms7/rest-builder'

const Header = () => {
    const isApiLoading = useApiIsLoading()

    return (
        <div>{`Loading: ${isApiLoading}`}</div>
    )
}

```