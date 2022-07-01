import axios from 'axios'
import { User } from 'Core/business/types/user'
import { Optional } from '@ms7/common'
import { createBaseQuery, createApi, combineHeaders } from '@ms7/rest-axios'
import store from 'Core/store/store'

const user: User = {
    id: 1,
    age: 2,
    name: '3',
}

const fn = ({ id, ...rest }: User) => {
    console.log(rest)
}

fn(user)

const baseQuery = createBaseQuery({
    baseUrl: 'http://localhost:3035/',
    prepareHeaders: apiHeaders => {
        const headers = new Headers()

        const token = store.getState().auth.token
        if(token) headers.set('Authorization', `Bearer ${token}`)

        combineHeaders(apiHeaders, headers)

        return apiHeaders
    },
    errorHandler: () => {
        const logoutUrl = store.getState().auth.logoutUrl

        if(logoutUrl) window.location.replace(logoutUrl)
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
        createUser: (data: Optional<User, 'id'>) => builder.mutation<User, typeof data>({
            url: 'users',
            method: 'POST',
            data,
            transformResponse: response => response.data,
        }),
        updateUser: ({ id, ...body }: User) => builder.mutation<User, typeof body>({
            url: `users/${id}`,
            method: 'PUT',
            data: body,
            transformResponse: response => response.data,
        }),
        patchUser: ({ id, ...body }: Optional<User, 'age' | 'name'>) => builder.mutation<User, typeof body>({
            url: `users/${id}`,
            method: 'PUT',
            data: body,
            transformResponse: response => response.data,
        }),
    }),
})

export const { getUsers, createUser, updateUser } = api.endpoints
