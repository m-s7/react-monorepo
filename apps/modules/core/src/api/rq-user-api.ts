import axios from 'axios'
import { User } from 'Core/business/types/user'
import { Optional } from '@ms7/common'
import { createBaseQuery, createApi, combineHeaders } from '@ms7/rest-axios'
import store from 'Core/store/store'

const baseQuery = (baseUrl: string, headers?: Headers, errorHandler?: () => void) => createBaseQuery({
    baseUrl: 'http://localhost:3035/',
    prepareHeaders: apiHeaders => {
        combineHeaders(apiHeaders, headers)

        return apiHeaders
    },
    errorHandler,
    axiosInstance: axios.create(),
})

const headers = new Headers()
headers.set('Authorization', 'Bearer 9821498219821')
headers.set('Jest', 'OK')

const api = createApi({
    baseQuery: baseQuery('http://localhost:3035', headers, () => { 
        //window.location.replace(store.getState())
    }),
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
