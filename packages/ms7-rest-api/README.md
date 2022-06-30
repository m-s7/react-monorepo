# Restful RTK

Helper methods for making api calls with rtk query.

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

```js
createApi({
    baseQuery: baseQueryWithAuth(baseUrl, token),
})
```

### Example

```ts
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithAuth } from '@ms7/restful-rtk'

interface User {
    readonly id: number,
    name: string,
    age: number,
}

const rtkUserApi = createApi({
    baseQuery: baseQueryWithAuth('http://localhost:3333', 'some-token'),
    tagTypes: ['Users'],
    endpoints: build => ({
        getUser: build.query<User, number>({
            query: id => ({ url: `users/${id}` }),
            transformResponse: (response: User, meta, arg) => response,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        updateUser: build.mutation<User, User>({
            query: ({ id, ...user }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: user,
            }),
            transformResponse: (response: User, meta, arg) => response,
            invalidatesTags: ['Users'],
        }),
    }),
})

export const { useGetUserQuery, useLazyGetUserQuery, useUpdateUserMutation } = rtkUserApi
export default rtkUserApi
```
