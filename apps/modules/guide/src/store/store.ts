import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import personReducer from 'Guide/store/reducers/person-reducer'
import counterReducer from 'Guide/store/reducers/counter-reducer'
import websocketReducer from 'Guide/store/reducers/websocket-reducer'

const store = configureStore({
    reducer: {
        guidePerson: personReducer,
        guideCounter: counterReducer,
        guideWebsocket: websocketReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppSubscribe = typeof reducersManager.subscribe
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store