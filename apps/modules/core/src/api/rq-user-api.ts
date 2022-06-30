import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { apiSubject, AxiosResponse } from '@ms7/restful-redux'
import { User } from 'Core/business/types/user'
import store from 'Core/store/store'
import { EnhancedStore } from '@reduxjs/toolkit'
import { getThunk } from '@ms7/restful-redux'

interface BaseQuery {
    api: AxiosInstance,
    store: EnhancedStore,
    baseUrl: string,
}

interface BaseQueryArgs<S> {
    baseUrl: string,
    store: S,
    prepareHeaders?: (headers: Headers) => Headers,
    errorHandler?: () => void,
    instance?: AxiosInstance,
}

const combineHeaders = (headers: AxiosRequestHeaders | Headers | undefined, newHeaders: Headers | undefined): void => {
    if(!headers || !newHeaders) return

    for(const key of newHeaders.keys()) {
        const value = newHeaders.get(key)

        if(value) {
            if(headers instanceof Headers)
                headers.set(key, value)
            else
                headers[key] = value
        }
    }
}

const createBaseQuery = <S extends EnhancedStore>({ baseUrl, store, prepareHeaders, errorHandler, instance }: BaseQueryArgs<S>): BaseQuery => {
    const api = (instance ?? axios.create())

    api.interceptors.request.use(
        config => {
            apiSubject.next({ isLoading: true })

            combineHeaders(config?.headers, (prepareHeaders ? prepareHeaders(new Headers()) : undefined))

            return config
        },
        error => {
            apiSubject.next({ isLoading: false })

            return Promise.reject(error)
        })

    api.interceptors.response.use(
        config => {
            apiSubject.next({ isLoading: false })

            return config
        },
        error => {
            apiSubject.next({ isLoading: false })

            if(error.status === 401 && errorHandler)
                errorHandler()

            return Promise.reject(error)
        })
    
    return {
        api,
        store,
        baseUrl,
    }
}

interface QueryBuilderOptions<T, R = AxiosResponse<T>> {
    url: string,
    transformResponse?: (response: R) => T,
}

interface QueryBuilder {
    get: <T>({ url }: QueryBuilderOptions<T>) => T | Promise<T>,
}

//TODO: normalize url and pass axios instance
const builder = (api: AxiosInstance, baseUrl: string): QueryBuilder => ({
    get: <T>({ url, transformResponse }: QueryBuilderOptions<T>) => 
        store.dispatch(getThunk<T>()(baseUrl + url)).unwrap().then((response: AxiosResponse<T>) => transformResponse ? transformResponse(response) : response.data),
})

interface ApiOptions<T> {
    baseQuery: BaseQuery,
    endpoints: (builder: QueryBuilder) => T,
}

interface Api<T> {
    endpoints: { [key in keyof T]: T[key] },
}

const createApi = <T>({ baseQuery, endpoints }: ApiOptions<T>): Api<T> => ({
    endpoints: endpoints((builder(baseQuery.api, baseQuery.baseUrl))),
})

const baseQuery = (baseUrl: string, store: EnhancedStore, headers?: Headers, errorHandler?: () => void) => createBaseQuery({
    baseUrl: 'http://localhost:3035/',
    store,
    prepareHeaders: apiHeaders => {
        combineHeaders(apiHeaders, headers)

        return apiHeaders
    },
    errorHandler,
    instance: axios.create(),
})

const api = createApi({
    baseQuery: baseQuery('http://localhost:3035', store),
    endpoints: builder => ({
        getUsers: () => builder.get<User[]>({
            url: 'users',
            transformResponse: response => response.data,
        }),
    }),
})

export const { getUsers } = api.endpoints
