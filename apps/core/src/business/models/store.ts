import restReducer from '@/store/reducers/rest-reducer'
import { ReducerDictionary } from '@/business/models/common'

export interface InitialReducers {
    rest: typeof restReducer,
}

export type Reducers = InitialReducers & ReducerDictionary
