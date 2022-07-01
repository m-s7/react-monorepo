import { AxiosInstance, AxiosResponse } from 'axios'
import { combineUrls } from './utils'

type MutationMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface QueryBuilderArgs<T, R = AxiosResponse<T>> {
    url: string,
    transformResponse?: (response: R) => T,
}

interface MutationBuilderArgs<T, D> extends QueryBuilderArgs<T> {
    method: MutationMethod,
    data: D,
}

export interface QueryBuilder {
    query: <T>({ url }: QueryBuilderArgs<T>) => T | Promise<T>,
    mutation: <T, D>({ url, data }: MutationBuilderArgs<T, D>) => Promise<T>,
}

export const builder = (axiosInstance: AxiosInstance, baseUrl: string): QueryBuilder => ({
    query: <T>({ url, transformResponse }: QueryBuilderArgs<T>) =>
        axiosInstance.get<T>(combineUrls(url, baseUrl)).then(response => transformResponse ? transformResponse(response) : response.data),
    mutation: <T, D>({ url, data, method, transformResponse }: MutationBuilderArgs<T, D>) => {
        const combinedUrl = combineUrls(url, baseUrl)

        switch(method) {
            case 'POST':
                return axiosInstance.post<T>(combinedUrl, data).then(response => transformResponse ? transformResponse(response) : response.data)
            case 'PUT':
                return axiosInstance.put<T>(combinedUrl, data).then(response => transformResponse ? transformResponse(response) : response.data)
            case 'PATCH':
                return axiosInstance.patch<T>(combinedUrl, data).then(response => transformResponse ? transformResponse(response) : response.data)
            case 'DELETE':
                return axiosInstance.delete(combinedUrl, data).then(response => transformResponse ? transformResponse(response) : response.data)
        }
    },
})