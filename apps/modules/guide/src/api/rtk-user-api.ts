import { User } from 'Guide/business/types/user'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithAuth } from '@ms7/restful-rtk'
import { Optional } from '@ms7/common'

const rtkUserApi = createApi({
    baseQuery: baseQueryWithAuth('http://localhost:3035', '111'),
    tagTypes: ['Users'],
    endpoints: build => ({
        getUser: build.query<User, number>({
            query: id => ({ url: `users/${id}` }),
            transformResponse: (response: User, meta, arg) => response,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        getUsers: build.query<User[], void>({
            query: () => ({ url: 'users' }),
            transformResponse: (response: User[], meta, arg) => response,
            providesTags: (result, error) => [{ type: 'Users' }],
        }),
        createUser: build.mutation<User, Optional<User, 'id'>>({
            query: ({ ...user }) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            transformResponse: (response: User, meta, arg) => response,
            invalidatesTags: ['Users'],
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
        patchUser: build.mutation<User, Optional<User, 'age' | 'name'>>({
            query: ({ id, ...user }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: user,
            }),
            transformResponse: (response: User, meta, arg) => response,
            invalidatesTags: ['Users'],
        }),
        deleteUser: build.mutation<void, number>({
            query: id => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
})

export const { useGetUsersQuery, useLazyGetUserQuery, useCreateUserMutation, useUpdateUserMutation, usePatchUserMutation, useDeleteUserMutation } = rtkUserApi
export default rtkUserApi