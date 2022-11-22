import { User } from 'Core/business/types/user'
import { Optional } from '@ms7/common'
import { createBaseQuery, createApi, combineHeaders } from '@ms7/rest-builder'
import store from 'Core/store/store'
import { logging } from '@ms7/logger'
// import { history } from '@ms7/router'

const baseQuery = createBaseQuery({
    baseUrl: 'http://localhost:3035/',
    prepareHeaders: apiHeaders => {
        const headers = new Headers()

        const token = store.getState().auth.token
        if(token) headers.set('Authorization', `Bearer ${token}`)

        combineHeaders(apiHeaders, headers)

        return apiHeaders
    },
    errorHandler: status => {
        // throw new Error('DUAP EXCEPTION')
        //
        // if(status === 401) history.push('/logout')
    },
    logger: logging.getLogger('rest'),
})

const api = createApi({
    baseQuery,
    endpoints: builder => ({
        getUsers: () => builder.query<User[]>({
            url: 'users',
            transformResponse: response => response.data,
        }),
        getUser: (id: number) => builder.query<User>({
            url: `users/${id}`,
            transformResponse: response => response.data,
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
        patchUser: ({ id, ...data }: Optional<User, 'age' | 'name'>) => builder.mutation<User, typeof data>({
            url: `users/${id}`,
            method: 'PATCH',
            data,
            transformResponse: response => response.data,
        }),
        deleteUser: (id: number) => builder.mutation({
            url: `users/${id}`,
            method: 'DELETE',
        }),
    }),
})

export const { getUsers, getUser, createUser, updateUser, patchUser, deleteUser } = api.endpoints
