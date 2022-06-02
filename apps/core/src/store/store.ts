import { restLogger } from '@/store/middleware/rest-logger'
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import restReducer from '@/store/reducers/rest-reducer'

const store = configureStore({
    reducer: { rest: restReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(restLogger),
})

// @ts-ignore
export const getModuleState = <T>(): T => (store.getState().apps as T)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store
