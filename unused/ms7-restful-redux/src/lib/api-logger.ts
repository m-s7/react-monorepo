import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { logging, getLogLevelForEnv, Logger } from '@ms7/logger'

export const apiLogger: Middleware = () => next => action => {
    logging.configure({ minLevels: { 'rest': getLogLevelForEnv(process.env.NODE_ENV === 'development') }}).registerConsoleLogger()

    logAction(logging.getLogger('rest'), action)

    return next(action)
}

const logAction = (logger: Logger, action: AnyAction): void => {
    switch(getActionType(action)) {
        case 'get':
            logGetAction(logger, action)
            break
        case 'post':
            logPostAction(logger, action)
            break
        case 'put':
            logPutAction(logger, action)
            break
        case 'patch':
            logPatchAction(logger, action)
            break
        case 'remove':
            logRemoveAction(logger, action)
            break
    }
}

const logGetAction = (logger: Logger, action: AnyAction): void => {
    const { meta, error, payload } = action

    switch(getActionStatus(action)) {
        case 'pending':
            logger.debug(`Fetch from ${getPathnameFromUrl(meta.arg)}`)
            break
        case 'fulfilled':
            logger.debug(`Received data from ${getPathnameFromUrl(meta.arg)}`, payload.data)
            break
        case 'rejected':
            logger.debug(`Failed to fetch from ${getPathnameFromUrl(meta.arg)}`, error)
            break
    }
}

const logPostAction = (logger: Logger, action: AnyAction): void => {
    const { meta, error, payload } = action

    switch(getActionStatus(action)) {
        case 'pending':
            logger.debug(`Post to ${getPathnameFromUrl(meta.arg.url)}`, meta.arg.body)
            break
        case 'fulfilled':
            logger.debug(`Created on ${getPathnameFromUrl(meta.arg.url)}`, payload.data)
            break
        case 'rejected':
            logger.debug(`Failed to post to ${getPathnameFromUrl(meta.arg.url)}`, error)
            break
    }
}

const logPutAction = (logger: Logger, action: AnyAction): void => {
    const { meta, error, payload } = action

    switch(getActionStatus(action)) {
        case 'pending':
            logger.debug(`Put data to ${getPathnameFromUrl(meta.arg.url)}`, meta.arg.body)
            break
        case 'fulfilled':
            logger.debug(`Updated on ${getPathnameFromUrl(meta.arg.url)}`, payload.data)
            break
        case 'rejected':
            logger.debug(`Failed to put to ${getPathnameFromUrl(meta.arg.url)}`, error)
            break
    }
}

const logPatchAction = (logger: Logger, action: AnyAction): void => {
    const { meta, error, payload } = action

    switch(getActionStatus(action)) {
        case 'pending':
            logger.debug(`Patch data on ${getPathnameFromUrl(meta.arg.url)}`, meta.arg.body)
            break
        case 'fulfilled':
            logger.debug(`Updated on ${getPathnameFromUrl(meta.arg.url)}`, payload.data)
            break
        case 'rejected':
            logger.debug(`Failed to patch on ${getPathnameFromUrl(meta.arg.url)}`, error)
            break
    }
}

const logRemoveAction = (logger: Logger, action: AnyAction): void => {
    const { meta, error } = action

    switch(getActionStatus(action)) {
        case 'pending':
            logger.debug(`Delete data on ${getPathnameFromUrl(meta.arg)}`)
            break
        case 'fulfilled':
            logger.debug(`Deleted from ${getPathnameFromUrl(meta.arg)}`)
            break
        case 'rejected':
            logger.debug(`Failed to delete on ${getPathnameFromUrl(meta.arg)}`, error)
            break
    }
}

const getActionType = (action: AnyAction): string => {
    const [, type] = (action.type as string).split('/')

    return (type || '')
}

const getActionStatus = (action: AnyAction): string => {
    const [, , status] = (action.type as string).split('/')

    return (status || '')
}

const getPathnameFromUrl = (url: string): string => new URL(url).pathname