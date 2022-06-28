import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authReducer } from '@ms7/auth-providers'
import personReducer from 'Core/store/reducers/person-reducer'
import counterReducer from 'Core/store/reducers/counter-reducer'
import rtkUserApi, { gqlApi } from 'Core/api/rtk-user-api'
import ApiService, { apiLogger as reduxLogger, restReducer } from '@ms7/restful-redux'
import { apiLogger as rtkLogger } from '@ms7/restful-rtk'

const store = configureStore({
    reducer: {
        auth: authReducer,
        rest: restReducer,
        corePerson: personReducer,
        coreCounter: counterReducer,
        [rtkUserApi.reducerPath]: rtkUserApi.reducer,
        [gqlApi.reducerPath]: gqlApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(rtkUserApi.middleware, gqlApi.middleware, rtkLogger, reduxLogger),
})

ApiService.setStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store