import { restLogger } from '@/store/middleware/rest-logger'
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import getConfig from '@/configs/app'
import { Reducers } from '@/business/models/store'

const store = configureStore({
    reducer: (getConfig().store.reducers as Reducers),
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(restLogger),
})

export const getModuleState = <T>(): T => (store.getState().apps as T)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store
