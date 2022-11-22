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

            if(logger) requestLogger(config, logger, loggerConfig)

            combineHeaders(config?.headers, (prepareHeaders ? prepareHeaders(new Headers()) : undefined))

            return config
        },
        error => {
            apiSubject.next({ isLoading: false })

            if(logger) errorLogger(error, logger, loggerConfig)

            return Promise.reject(error)
        })

    api.interceptors.response.use(
        config => {
            apiSubject.next({ isLoading: false })

            if(logger) responseLogger(config, logger, loggerConfig)

            return config
        },
        error => {
            apiSubject.next({ isLoading: false })

            if(logger) errorLogger(error, logger, loggerConfig)
            if(errorHandler) errorHandler(error.status)

            return Promise.reject(error)
        })

    return {
        axiosInstance: api,
        baseUrl,
    }
}

