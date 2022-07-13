import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authReducer } from '@ms7/auth-providers'
import personReducer from 'Core/store/reducers/person-reducer'
import counterReducer from 'Core/store/reducers/counter-reducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        corePerson: personReducer,
        coreCounter: counterReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store