import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'Dummy/store/store'

export interface PersonState {
    state1: number,
    state2: string,
    state3: { name: string, type: string, age: number },
}

const initialState: PersonState = {
    state1: 0,
    state2: 'nothing',
    state3: { name: 'Michał', type: 'Human', age: 37 },
}

export const personReducer = createSlice({
    name: 'dummy',
    initialState,
    reducers: {
        setState1: (state, action: PayloadAction<number>) => {
            state.state1 = action.payload
        },
        setState2: (state, action: PayloadAction<string>) => {
            state.state2 = action.payload
        },
        setName: (state, action: PayloadAction<string>) => {
            state.state3.name = action.payload
        },
        setType: (state, action: PayloadAction<string>) => {
            state.state3.type = action.payload
        },
        setAge: (state, action: PayloadAction<number>) => {
            state.state3.age = action.payload
        },
        reset: () => initialState,
    },
})

export const { setState1, setState2, setName, setType, setAge, reset } = personReducer.actions

// @ts-ignore
export const selectState1 = (state: RootState) => state.dummyPerson.state1
// @ts-ignore
export const selectState2 = (state: RootState) => state.dummyPerson.state2
// @ts-ignore
export const selectState3 = (state: RootState) => state.dummyPerson.state3

export default personReducer.reducer
