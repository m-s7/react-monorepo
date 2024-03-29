import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { logging, getLogLevelForEnv, Logger } from '@ms7/logger'

export const apiLogger: Middleware = () => next => action => {
    logging.configure({ minLevels: { 'rtk-query': getLogLevelForEnv(process.env.NODE_ENV === 'development') }}).registerConsoleLogger()

    logAction(logging.getLogger('rtk-query'), action)

    return next(action)
}

const logAction = (logger: Logger, action: AnyAction): void => {
    switch(getQueryType(action)) {
        case 'executeQuery':
            logQueryAction(logger, action)
            break
        case 'executeMutation':
            logMutationAction(logger, action)
            break
    }
}

const logQueryAction = (logger: Logger, action: AnyAction): void => {
    const { meta, error, payload } = action
    const requestStatus = meta.requestStatus

    const data: { [x: string]: string } = {
        endpointName: meta.arg.endpointName,
        queryCacheKey: meta.arg.queryCacheKey,
        args: meta.arg.originalArgs,
    }

    switch(requestStatus) {
        case 'pending':
            logger.debug('Execute query', data)
            break
        case 'fulfilled':
            data.payload = payload
            logger.debug('Query successful', data)
            break
        case 'rejected':
            data.error = error
            logger.debug('Query failed', data)
            break
    }
}

const logMutationAction = (logger: Logger, action: AnyAction): void => {
    const { meta, error, payload } = action
    const requestStatus = meta.requestStatus

    const data: { [x: string]: string } = {
        endpointName: meta.arg.endpointName,
        args: meta.arg.originalArgs,
    }

    switch(requestStatus) {
        case 'pending':
            logger.debug('Execute mutation', data)
            break
        case 'fulfilled':
            data.payload = payload
            logger.debug('Mutation successful', data)
            break
        case 'rejected':
            data.error = error
            logger.debug('Mutation failed', data)
            break
    }
}

const getQueryType = (action: AnyAction): string => {
    const [, type] = (action.type as string).split('/')

    return (type || '')
}
