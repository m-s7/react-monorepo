import { Logger } from '@ms7/logger'
import { AnyAction } from '@reduxjs/toolkit'

export const logRestAction = (logger: Logger, action: AnyAction): void => {
    switch(getActionType(action)) {
        case 'get':
            logRestGetAction(logger, action)
            break
        case 'post':
            logRestPostAction(logger, action)
            break
        case 'put':
            logRestPutAction(logger, action)
            break
        case 'patch':
            logRestPatchAction(logger, action)
            break
        case 'remove':
            logRestRemoveAction(logger, action)
            break
    }
}

const logRestGetAction = (logger: Logger, action: AnyAction): void => {
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

const logRestPostAction = (logger: Logger, action: AnyAction): void => {
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

const logRestPutAction = (logger: Logger, action: AnyAction): void => {
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

const logRestPatchAction = (logger: Logger, action: AnyAction): void => {
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

const logRestRemoveAction = (logger: Logger, action: AnyAction): void => {
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