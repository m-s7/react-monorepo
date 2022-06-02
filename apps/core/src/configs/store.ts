import restReducer from '@/store/reducers/rest-reducer'
import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { getAppsReducers } from '@/utils/apps-utils'
import { Reducers } from '@/business/models/store'

const getConfig = (): Reducers => ({
    rest: restReducer,
    apps: (combineReducers({ ...getAppsReducers() }) as Reducer<unknown>),
})

export default getConfig