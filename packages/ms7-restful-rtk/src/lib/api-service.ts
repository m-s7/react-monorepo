import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/index.js'

const baseQuery = (baseUrl: string, token?: string) => fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
        if(token) headers.set('Authorization', `Bearer ${token}`)

        return headers
    },
})

export const baseQueryWithAuth = (baseUrl: string, token?: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraOptions) => {
    const result = await baseQuery(baseUrl, token)(args, api, extraOptions)
    if(result.error && result.error.status === 401) {
        console.log('API ERROR', result)
    }

    return result
}

export const baseQueryWithoutAuth = (baseUrl: string, token?: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraOptions) => baseQuery(baseUrl, token)(args, api, extraOptions)
