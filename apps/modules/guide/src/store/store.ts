import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import personReducer from 'Guide/store/reducers/person-reducer'
import counterReducer from 'Guide/store/reducers/counter-reducer'
import websocketReducer from 'Guide/store/reducers/websocket-reducer'
import rtkUserApi from 'Guide/api/rtk-user-api'
import { queryLogger } from 'Guide/store/middleware/query-logger'

const store = configureStore({
    reducer: {
        guidePerson: personReducer,
        guideCounter: counterReducer,
        guideWebsocket: websocketReducer,
        [rtkUserApi.reducerPath]: rtkUserApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(rtkUserApi.middleware, queryLogger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store