import { AxiosInstance, AxiosResponse } from 'axios'
import { combineUrls } from './utils'

interface QueryBuilderArgs<T, R = AxiosResponse<T>> {
    url: string,
    transformResponse?: (response: R) => T,
}

interface MutationBuilderArgs<T, D> extends QueryBuilderArgs<T> {
    data: D,
}

export interface QueryBuilder {
    get: <T>({ url }: QueryBuilderArgs<T>) => T | Promise<T>,
    post: <T, D>({ url, data }: MutationBuilderArgs<T, D>) => Promise<T>,
}

export const builder = (axiosInstance: AxiosInstance, baseUrl: string): QueryBuilder => ({
    get: <T>({ url, transformResponse }: QueryBuilderArgs<T>) =>
        axiosInstance.get<T>(combineUrls(baseUrl, url)).then(response => transformResponse ? transformResponse(response) : response.data),
    post: <T, D>({ url, data, transformResponse }: MutationBuilderArgs<T, D>) =>
        axiosInstance.post<T>(combineUrls(baseUrl, url), data).then(response => transformResponse ? transformResponse(response) : response.data),
})
