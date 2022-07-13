import { AxiosInstance, AxiosResponse } from 'axios'
import { combineUrls } from './utils'

type DeleteMethod = 'DELETE'
type MutationMethod = 'POST' | 'PUT' | 'PATCH'

type TransformResponse<T = undefined, R = AxiosResponse<T>> = T extends undefined ? never : (response: R) => T

interface QueryBuilderArgs<T = undefined> {
    url: string,
    transformResponse?: TransformResponse<T>,
}

interface MutationBuilderArgs<T, D> extends QueryBuilderArgs<T> {
    method: MutationMethod,
    data: D,
}

interface DeleteBuilderArgs extends QueryBuilderArgs {
    method: DeleteMethod,
    data?: never,
}

export interface QueryBuilder {
    query: <T>({ url, transformResponse }: QueryBuilderArgs<T>) => T | Promise<T>,
    mutation: <T = undefined, D = undefined>({ url, data, method, transformResponse }: MutationBuilderArgs<T, D> | DeleteBuilderArgs) => Promise<T>,
}

export const builder = (axiosInstance: AxiosInstance, baseUrl: string): QueryBuilder => ({
    query: <T>({ url, transformResponse }: QueryBuilderArgs<T>) =>
        axiosInstance.get<T>(combineUrls(url, baseUrl)).then(response => transformResponse ? transformResponse(response) : response.data),
    mutation: <T, D>({ url, data, method, transformResponse }: MutationBuilderArgs<T, D> | DeleteBuilderArgs) => {
        const combinedUrl = combineUrls(url, baseUrl)

        switch(method) {
            case 'POST':
                return axiosInstance.post<T>(combinedUrl, data).then(response => transformResponse ? transformResponse(response) : response.data)
            case 'PUT':
                return axiosInstance.put<T>(combinedUrl, data).then(response => transformResponse ? transformResponse(response) : response.data)
            case 'PATCH':
                return axiosInstance.patch<T>(combinedUrl, data).then(response => transformResponse ? transformResponse(response) : response.data)
            case 'DELETE':
                return axiosInstance.delete(combinedUrl)
        }
    },
})