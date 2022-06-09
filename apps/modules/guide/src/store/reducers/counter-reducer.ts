import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from 'Guide/store/store'
import { fetchCount } from 'Guide/api/counter-api'

export interface CounterState {
    value: number,
    status: 'idle' | 'loading' | 'failed',
}

const initialState: CounterState = {
    value: 0,
    status: 'idle',
}

export const counterReducer = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        reset: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(incrementAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value += action.payload
            })
    },
})

// toolkit thunk
export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const response = await fetchCount(amount)

        return response.data
    },
)

// manual thunk
export const incrementIfOdd = (amount: number): AppThunk => (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if(currentValue % 2 === 1) dispatch(incrementByAmount(amount))
}

export const { increment, decrement, incrementByAmount, setValue, reset } = counterReducer.actions

export const selectCount = (state: RootState) => state.guideCounter.value

export default counterReducer.reducer
