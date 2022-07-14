import { Logger } from '@ms7/logger'

export const log = (logger: Logger, message: string, data?: object, params?: object, isError?: boolean): void => {
    if(data && params) {
        if(isError) logger.error(message, data, params)
        else logger.debug(message, data, params)
    }
    else if(data && !params) {
        if(isError) logger.error(message, data)
        else logger.debug(message, data)
    }
    else if(!data && params) {
        if(isError) logger.error(message, params)
        else logger.debug(message, params)
    }
    else {
        if(isError) logger.error(message)
        else logger.debug(message)
    }
}