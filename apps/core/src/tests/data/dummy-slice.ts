import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

interface DummyState {
    state1: number,
    state2: string,
    state3: { name: string, type: string, age: number },
}

const initialState: DummyState = {
    state1: 0,
    state2: 'nothing',
    state3: { name: 'Adam', type: 'Human', age: 24 },
}

export const dummySlice = createSlice({
    name: 'dummy',
    initialState,
    reducers: {
        setState1: (state: Draft<DummyState>, action: PayloadAction<number>) => {
            state.state1 = action.payload
        },
        setState2: (state: Draft<DummyState>, action: PayloadAction<string>) => {
            state.state2 = action.payload
        },
        setName: (state: Draft<DummyState>, action: PayloadAction<string>) => {
            state.state3.name = action.payload
        },
        setType: (state: Draft<DummyState>, action: PayloadAction<string>) => {
            state.state3.type = action.payload
        },
        setAge: (state: Draft<DummyState>, action: PayloadAction<number>) => {
            state.state3.age = action.payload
        },
    },
})

export const { setState1, setState2, setName, setType, setAge } = dummySlice.actions

// export const selectState1 = (state: RootState) => state.dummy.state1
// export const selectState2 = (state: RootState) => state.dummy.state2
// export const selectState3 = (state: RootState) => state.dummy.state3

// export const selectState1 = (state: RootState) => 1
// export const selectState2 = (state: RootState) => 'aa'
// export const selectState3 = (state: RootState) => 'bb'

export default dummySlice.reducer
