import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/index.js'
import { apiSubject } from './api-subject'

const baseQuery = (baseUrl: string, token?: string) => fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        apiSubject.next({ isLoading: true })

        const token = (getState() as { auth: { token: string }}).auth.token

        if(token) headers.set('Authorization', `Bearer ${token}`)

        return headers
    },
})

export const baseQueryWithAuth = (baseUrl: string, token?: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraOptions) => {
    const result = await baseQuery(baseUrl, token)(args, api, extraOptions)
    apiSubject.next({ isLoading: false })
    if(result.error && result.error.status === 401) {
        //TODO: pass logout method here
        console.log('API ERROR', result)
    }

    return result
}

export const baseQueryWithoutAuth = (baseUrl: string, token?: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraOptions) => baseQuery(baseUrl, token)(args, api, extraOptions)
