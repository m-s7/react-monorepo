import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { AppConfig } from '@/business/models/app'

interface ConfigState {
    appsConfigs: AppConfig[],
}

const initialState: ConfigState = {
    appsConfigs: [],
}

export const configReducer = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setAppsConfigs: (state, action: PayloadAction<AppConfig[]>) => {
            state.appsConfigs = action.payload
        },
    },
})

export const { setAppsConfigs } = configReducer.actions

export const selectAppsConfigs = (state: RootState) => state.config.appsConfigs

export default configReducer.reducer
