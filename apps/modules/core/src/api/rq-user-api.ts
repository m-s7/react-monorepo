import axios from 'axios'
import { User } from 'Core/business/types/user'
import { Optional } from '@ms7/common'
import { createBaseQuery, createApi, combineHeaders } from '@ms7/rest-axios'
import store from 'Core/store/store'

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
        getUsers: () => builder.get<User[]>({
            url: 'users',
            transformResponse: response => response.data,
        }),
        createUser: (data: Optional<User, 'id'>) => builder.post<User, typeof data>({
            url: 'users',
            data,
            transformResponse: response => response.data,
        }),
    }),
})

export const { getUsers, createUser } = api.endpoints
