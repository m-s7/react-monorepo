import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'
import { apiSubject, AxiosResponse } from '@ms7/restful-redux'
import { User } from 'Core/business/types/user'
import store from 'Core/store/store'
import { EnhancedStore } from '@reduxjs/toolkit'
import { getThunk, postThunk } from '@ms7/restful-redux'
import { Optional } from '@ms7/common'

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

interface QueryBuilderArgs<T, R = AxiosResponse<T>> {
    url: string,
    transformResponse?: (response: R) => T,
}

interface MutationBuilderArgs<T, D> extends QueryBuilderArgs<T> {
    body: D,
}

interface QueryBuilder {
    get: <T>({ url }: QueryBuilderArgs<T>) => T | Promise<T>,
    post: <T, D>({ url, body }: MutationBuilderArgs<T, D>) => Promise<T>,
}

//TODO: normalize url and pass axios instance
const builder = (api: AxiosInstance, baseUrl: string): QueryBuilder => ({
    get: <T>({ url, transformResponse }: QueryBuilderArgs<T>) =>
        store.dispatch(getThunk<T>()(baseUrl + url)).unwrap().then((response: AxiosResponse<T>) => transformResponse ? transformResponse(response) : response.data),
    post: <T, D>({ url, body, transformResponse }: MutationBuilderArgs<T, D>) =>
        store.dispatch(postThunk<T, D>()({ url: `${baseUrl}${url}`, body })).unwrap().then((response: AxiosResponse<T>) => transformResponse ? transformResponse(response) : response.data),
})

interface ApiArgs<T> {
    baseQuery: BaseQuery,
    endpoints: (builder: QueryBuilder) => T,
}

interface Api<T> {
    endpoints: { [key in keyof T]: T[key] },
}

const createApi = <T>({ baseQuery, endpoints }: ApiArgs<T>): Api<T> => ({
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

const headers = new Headers()
headers.set('Authorization', 'Bearer 9821498219821')
headers.set('Jest', 'OK')

const api = createApi({
    baseQuery: baseQuery('http://localhost:3035', store, headers, () => { console.log('ERROR') }),
    endpoints: builder => ({
        getUsers: () => builder.get<User[]>({
            url: 'users',
            transformResponse: response => response.data,
        }),
        createUser: (body: Optional<User, 'id'>) => builder.post<User, typeof body>({
            url: 'users',
            body,
            transformResponse: response => response.data,
        }),
    }),
})

export const { getUsers, createUser } = api.endpoints
