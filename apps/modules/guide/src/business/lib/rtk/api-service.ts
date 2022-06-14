import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3035/',
    prepareHeaders: (headers, { getState }) => {
        headers.set('Authorization', `Bearer ${123}`)

        return headers
    },
})

export const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    if(result.error && result.error.status === 401) {
        console.log('API ERROR', result)
    }

    return result
}

