import LogBuilder from './log-builder'
import { AxiosResponse } from 'axios'
import { RestLoggerConfig } from './types'
import { Logger } from '@ms7/logger'
import { log } from './logger'

export const responseLogger = (response: AxiosResponse, logger: Logger, config?: RestLoggerConfig): AxiosResponse => {
    const { config: { method, baseURL, url, params }, status, statusText, data } = response

    const logBuilder = new LogBuilder(config)
    const logMessage = logBuilder
        .method(method)
        .status(status, statusText)
        .url(url, baseURL)
        .data(data)
        .params(params)
        .build()

    log(logger, logMessage, logBuilder.logData, logBuilder.logParams)

    return response
}
