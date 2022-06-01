import { Middleware } from '@reduxjs/toolkit'
import { logRestAction } from '@/utils/store/middleware-logger-utils'
import { logging } from '@/business/log-manager'

export const restLogger: Middleware = () => next => action => {
    logRestAction(logging.getLogger('rest'), action)

    return next(action)
}
