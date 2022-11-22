import LogBuilder from './log-builder'
import { AxiosError } from 'axios'
import { RestLoggerConfig } from './types'
import { Logger } from '@ms7/logger'
import { log } from './logger'

export const errorLogger = (error: AxiosError, logger: Logger, config?: RestLoggerConfig): AxiosError => {
    if(!error.config) return error

    const { config: { method, baseURL, url, params }, response } = error

    let status, statusText
    if(response) {
        status = response.status
        statusText = response.statusText
    }

    const logBuilder = new LogBuilder(config)
    const logMessage = logBuilder
        .method(method)
        .status(status, statusText)
        .url(url, baseURL)
        .params(params)
        .build()

    log(logger, logMessage, logBuilder.logData, logBuilder.logParams, true)

    return error
}
