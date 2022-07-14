import LogBuilder from './log-builder'
import { AxiosRequestConfig } from 'axios'
import { RestLoggerConfig } from './types'
import { Logger } from '@ms7/logger'
import { log } from './logger'

export const requestLogger = (logger: Logger, config?: RestLoggerConfig) => (request: AxiosRequestConfig): AxiosRequestConfig => {
    const { method, baseURL, url, data, params } = request

    const logBuilder = new LogBuilder(config)
    const logMessage = logBuilder
        .method(method)
        .url(url, baseURL)
        .data(data)
        .params(params)
        .build()

    log(logger, logMessage, logBuilder.logData, logBuilder.logParams)

    return request
}
