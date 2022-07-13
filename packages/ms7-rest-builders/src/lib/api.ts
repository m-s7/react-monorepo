import { BaseQuery } from './base-query'
import { builder, QueryBuilder } from './builder'

interface ApiArgs<T> {
    baseQuery: BaseQuery,
    endpoints: (builder: QueryBuilder) => T,
}

interface Api<T> {
    endpoints: { [key in keyof T]: T[key] },
}

export const createApi = <T>({ baseQuery, endpoints }: ApiArgs<T>): Api<T> => ({
    endpoints: endpoints((builder(baseQuery.axiosInstance, baseQuery.baseUrl))),
})