import { User } from 'Guide/business/models/user/user'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithAuth } from 'Guide/business/lib/rtk/api-service'

const rtkUserApi = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: ['User'],
    endpoints: build => ({
        getUser: build.query<User, number>({
            query: id => ({ url: `users/${id}` }),
            transformResponse: (response: User, meta, arg) => response,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        getUsers: build.query<User[], void>({
            query: () => ({ url: 'users' }),
            transformResponse: (response: User[], meta, arg) => response,
            providesTags: (result, error) => [{ type: 'User' }],
        }),
    }),
})

export const { useGetUsersQuery, useLazyGetUserQuery } = rtkUserApi
export default rtkUserApi