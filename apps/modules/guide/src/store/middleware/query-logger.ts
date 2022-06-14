import { Middleware } from '@reduxjs/toolkit'
import { logging, getLogLevelForEnv } from '@ms7/logger'

export const queryLogger: Middleware = () => next => action => {
    // console.log(action)

    return next(action)
}
