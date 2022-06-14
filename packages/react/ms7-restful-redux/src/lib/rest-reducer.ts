import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import ApiService from './api-service'
import { AxiosResponse } from 'axios'

interface RestState {
    status: 'idle' | 'loading' | 'failed',
}

const initialState: RestState = {
    status: 'idle',
}

interface Params<D> {
    url: string,
    body: D,
}

export const getThunk = <R>() => createAsyncThunk(
    'rest/get',
    async (url: string): Promise<AxiosResponse<R>> => await ApiService.service.get<R>(url),
)

export const postThunk = <R, D>() => createAsyncThunk(
    'rest/post',
    async (params: Params<D>): Promise<AxiosResponse<R>> => {
        const { url, body } = params

        return await ApiService.service.post<R>(url, body)
    },
)

export const putThunk = <R, D>() => createAsyncThunk(
    'rest/put',
    async (params: Params<D>): Promise<AxiosResponse<R>> => {
        const { url, body } = params

        return await ApiService.service.put<R>(url, body)
    },
)

export const patchThunk = <R, D>() => createAsyncThunk(
    'rest/patch',
    async (params: Params<D>): Promise<AxiosResponse<R>> => {
        const { url, body } = params

        return await ApiService.service.patch<R>(url, body)
    },
)

export const removeThunk = () => createAsyncThunk(
    'rest/remove',
    async (url: string): Promise<AxiosResponse> => await ApiService.service.delete(url),
)

export const restSlice = createSlice({
    name: 'rest',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
            state.status = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getThunk().pending, state => {
                state.status = 'loading'
            })
            .addCase(getThunk().fulfilled, state => {
                state.status = 'idle'
            })
            .addCase(getThunk().rejected, state => {
                state.status = 'failed'
            })
            .addCase(postThunk().pending, state => {
                state.status = 'loading'
            })
            .addCase(postThunk().fulfilled, state => {
                state.status = 'idle'
            })
            .addCase(postThunk().rejected, state => {
                state.status = 'failed'
            })
            .addCase(putThunk().pending, state => {
                state.status = 'loading'
            })
            .addCase(putThunk().fulfilled, state => {
                state.status = 'idle'
            })
            .addCase(putThunk().rejected, state => {
                state.status = 'failed'
            })
            .addCase(patchThunk().pending, state => {
                state.status = 'loading'
            })
            .addCase(patchThunk().fulfilled, state => {
                state.status = 'idle'
            })
            .addCase(patchThunk().rejected, state => {
                state.status = 'failed'
            })
            .addCase(removeThunk().pending, state => {
                state.status = 'loading'
            })
            .addCase(removeThunk().fulfilled, state => {
                state.status = 'idle'
            })
            .addCase(removeThunk().rejected, state => {
                state.status = 'failed'
            })
    },
})

export const { setStatus } = restSlice.actions

export const selectStatus = (state: any) => state.rest.status

export const restReducer = restSlice.reducer