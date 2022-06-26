// noinspection TypeScriptValidateJSTypes

import { env } from '@ms7/common'
import { User } from 'Core/business/types/user'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithAuth, providesList } from '@ms7/restful-rtk'
import { Optional } from '@ms7/common'

const rtkUserApi = createApi({
    baseQuery: baseQueryWithAuth(env.REACT_APP_CORE_API_URL),
    tagTypes: ['Users'],
    endpoints: build => ({
        getUsers: build.query<User[], void>({
            query: () => ({ url: 'users' }),
            transformResponse: (response: User[], meta, arg) => response,
            providesTags: result => providesList(result, 'Users'),
        }),
        getUser: build.query<User, number>({
            query: id => ({ url: `users/${id}` }),
            transformResponse: (response: User, meta, arg) => response,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        createUser: build.mutation<User, Optional<User, 'id'>>({
            query: ({ ...user }) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            transformResponse: (response: User, meta, arg) => response,
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        updateUser: build.mutation<User, User>({
            query: ({ id, ...user }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: user,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                // optimistic update
                const patchResult = dispatch(
                    rtkUserApi.util.updateQueryData('getUser', id, draft => {
                        Object.assign(draft, patch)
                    }),
                )
                queryFulfilled.catch(patchResult.undo)
            },
            transformResponse: (response: User, meta, arg) => response,
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        patchUser: build.mutation<User, Optional<User, 'age' | 'name'>>({
            query: ({ id, ...user }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: user,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                // pessimistic update
                const { data: updatedUser } = await queryFulfilled
                dispatch(
                    rtkUserApi.util.updateQueryData('getUser', id, draft => {
                        Object.assign(draft, updatedUser)
                    }),
                )
            },
            transformResponse: (response: User, meta, arg) => response,
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        deleteUser: build.mutation<void, number>({
            query: id => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    rtkUserApi.util.updateQueryData('getUser', id, draft => {
                        Object.assign(draft, null)
                    }),
                )
                queryFulfilled.catch(patchResult.undo)
            },
            invalidatesTags: [{ type: 'Users' }],
        }),
    }),
})

export const { useGetUsersQuery, useLazyGetUserQuery, useCreateUserMutation, useUpdateUserMutation, usePatchUserMutation, useDeleteUserMutation } = rtkUserApi
export default rtkUserApi
