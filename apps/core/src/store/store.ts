import { restLogger } from '@/store/middleware/rest-logger'
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import ApiService, { restReducer } from '@ms7/restful-redux'

const store = configureStore({
    reducer: { rest: restReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(restLogger),
})

ApiService.setStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store
