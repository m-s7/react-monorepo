import { BaseQuery } from './base-query'
import { builder, QueryBuilder } from './builder'

interface ApiArgs<T> {
    baseQuery: BaseQuery,
    endpoints: (builder: QueryBuilder) => T,
}

interface Api<T> {
    endpoints: { [K in keyof T]: T[K] },
}

export const createApi = <T>({ baseQuery, endpoints }: ApiArgs<T>): Api<T> => ({
    endpoints: endpoints((builder(baseQuery.axiosInstance, baseQuery.baseUrl))),
})
