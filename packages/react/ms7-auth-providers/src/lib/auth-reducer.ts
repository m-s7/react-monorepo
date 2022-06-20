import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    token: string | undefined,
    username: string | undefined,
    logoutUrl: URL | undefined,
}

const initialState: AuthState = {
    token: undefined,
    username: undefined,
    logoutUrl: undefined,
}

export const authSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | undefined>) => {
            state.token = action.payload
        },
        setUsername: (state, action: PayloadAction<string | undefined>) => {
            state.username = action.payload
        },
        setLogoutUrl: (state, action: PayloadAction<URL | undefined>) => {
            state.logoutUrl = action.payload
        },
    },
})

export const { setToken, setLogoutUrl, setUsername } = authSlice.actions

export const authReducer = authSlice.reducer
