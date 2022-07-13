import axios, { AxiosInstance } from 'axios'
import { combineHeaders } from './utils'

export interface BaseQuery {
    axiosInstance: AxiosInstance,
    baseUrl: string,
}

interface BaseQueryArgs {
    baseUrl: string,
    prepareHeaders?: (headers: Headers) => Headers,
    errorHandler?: (status: number) => void,
    axiosInstance?: AxiosInstance,
}

export const createBaseQuery = ({ baseUrl, prepareHeaders, errorHandler, axiosInstance }: BaseQueryArgs): BaseQuery => {
    const api = (axiosInstance ?? axios.create())

    api.interceptors.request.use(
        config => {
            combineHeaders(config?.headers, (prepareHeaders ? prepareHeaders(new Headers()) : undefined))

            return config
        },
        error => Promise.reject(error))

    api.interceptors.response.use(
        config => config,
        error => {
            if(errorHandler) errorHandler(error.status)

            return Promise.reject(error)
        })

    return {
        axiosInstance: api,
        baseUrl,
    }
}

