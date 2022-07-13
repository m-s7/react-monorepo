import axios from 'axios'
import { User } from 'Core/business/types/user'
import { Optional } from '@ms7/common'
import { createBaseQuery, createApi, combineHeaders } from '@ms7/rest-builder'
import store from 'Core/store/store'

// import { setLogger } from 'react-query'
// setLogger({
//     log: console.log,
//     warn: console.warn,
//     error: () => {},
// })

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
        if(status === 401) {
            const logoutUrl = store.getState().auth.logoutUrl

            if(logoutUrl) window.location.replace(logoutUrl)
        }
    },
    axiosInstance: axios.create(),
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
        createUser: (data: Optional<User, 'id'>) => builder.mutation<User, typeof data>({
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
