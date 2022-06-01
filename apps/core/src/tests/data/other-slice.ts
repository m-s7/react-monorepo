import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'

interface OtherState {
    tmp: number,
}

const initialState: OtherState = {
    tmp: 1,
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {
        setOther: (state: Draft<OtherState>, action: PayloadAction<number>) => {
            state.tmp = action.payload
        },
    },
})

export const { setOther } = otherSlice.actions

// @ts-ignore
export const selectTmp = (state: RootState) => state.other.tmp

export default otherSlice.reducer
