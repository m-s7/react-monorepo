import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    token: string | undefined,
}

const initialState: AuthState = {
    token: undefined,
}

export const authSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | undefined>) => {
            state.token = action.payload
        },
    },
})

export const { setToken } = authSlice.actions

export const authReducer = authSlice.reducer
