import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/index.js'
import { apiSubject } from './api-subject'
import { AuthState } from '@ms7/auth'

const isAuthState = (object: object): object is AuthState => ('token' in object && 'username' in object && 'logoutUrl' in object)
const getAuthState = (store: object): AuthState | undefined => {
    for(const state of Object.values(store)) {
        if(isAuthState(state))
            return state
    }
}

const baseQuery = (baseUrl: string) => fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        apiSubject.next({ isLoading: true })

        const authState = getAuthState(getState() as object)
        if(authState && authState.token)
            headers.set('Authorization', `Bearer ${authState.token}`)

        return headers
    },
})

export const baseQueryWithAuth = (baseUrl: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraOptions) => {
    const result = await baseQuery(baseUrl)(args, api, extraOptions)
    apiSubject.next({ isLoading: false })

    const authState = getAuthState(api.getState() as object)
    if(authState && authState.logoutUrl && result.error && result.error.status === 401)
        window.location.replace(authState.logoutUrl)

    return result
}

export const baseQueryWithoutAuth = (baseUrl: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraOptions) => baseQuery(baseUrl)(args, api, extraOptions)
