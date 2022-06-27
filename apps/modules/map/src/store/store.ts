import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authReducer } from '@ms7/auth-providers'

const store = configureStore({
    reducer: { auth: authReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store