import axios, { AxiosInstance } from 'axios'
import { combineHeaders } from './utils'
import { apiSubject } from './api-subject'
import { Logger } from '@ms7/logger'
import { RestLoggerConfig } from './logger/types'
import { errorLogger } from './logger/error-logger'
import { requestLogger } from './logger/request-logger'
import { responseLogger } from './logger/response-logger'

export interface BaseQuery {
    axiosInstance: AxiosInstance,
    baseUrl: string,
}

interface BaseQueryArgs {
    baseUrl: string,
    prepareHeaders?: (headers: Headers) => Headers,
    errorHandler?: (status: number) => void,
    axiosInstance?: AxiosInstance,
    logger?: Logger,
    loggerConfig?: RestLoggerConfig,
}

export const createBaseQuery = ({ baseUrl, prepareHeaders, errorHandler, axiosInstance, logger, loggerConfig }: BaseQueryArgs): BaseQuery => {
    const api = (axiosInstance ?? axios.create())

    api.interceptors.request.use(
        config => {
            apiSubject.next({ isLoading: true })
            combineHeaders(config?.headers, (prepareHeaders ? prepareHeaders(new Headers()) : undefined))

            return config
        },
        error => {
            apiSubject.next({ isLoading: false })
            Promise.reject(error)
        })

    api.interceptors.response.use(
        config => {
            apiSubject.next({ isLoading: false })

            return config
        },
        error => {
            apiSubject.next({ isLoading: false })
            if(errorHandler) errorHandler(error.status)

            return Promise.reject(error)
        })

    if(logger) {
        api.interceptors.request.use(requestLogger(logger, loggerConfig), errorLogger(logger, loggerConfig))
        api.interceptors.response.use(responseLogger(logger, loggerConfig), errorLogger(logger, loggerConfig))
    }    
    
    return {
        axiosInstance: api,
        baseUrl,
    }
}
