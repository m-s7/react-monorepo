import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { WebsocketClient } from '@ms7/websocket-client'

export interface WebsocketState {
    client: WebsocketClient | undefined,
}

const initialState: WebsocketState = {
    client: undefined,
}

export const websocketReducer = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setClient: (state, action: PayloadAction<WebsocketClient>) => {
            state.client = action.payload
        },
        reset: () => initialState,
    },
})

export const { setClient, reset } = websocketReducer.actions

export const selectClient = (state: RootState) => state.dummyWebsocket.client

export default websocketReducer.reducer
