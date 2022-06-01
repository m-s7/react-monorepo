import restReducer from '@/store/reducers/rest-reducer'
import configReducer from '@/store/reducers/config-reducer'
import { ReducerDictionary } from '@/business/models/common'

export interface InitialReducers {
    rest: typeof restReducer,
    config: typeof configReducer,
}

export type Reducers = InitialReducers & ReducerDictionary
