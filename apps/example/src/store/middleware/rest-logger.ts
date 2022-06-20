import { Middleware } from '@reduxjs/toolkit'
import { logRestAction } from '@/utils/store/middleware-logger-utils'
import { logging, getLogLevelForEnv } from '@ms7/logger'
import { isDev } from '@ms7/common'

export const restLogger: Middleware = () => next => action => {
    logging.addConfigurationOption({ minLevels: { 'rest': getLogLevelForEnv(isDev()) }})
    
    logRestAction(logging.getLogger('rest'), action)

    return next(action)
}
