import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PersonName = 'Mark' | 'Claudia'
type PersonType = 'man' | 'woman'

interface PersonState {
    id: number,
    description: string,
    data: { name: PersonName, type: PersonType, age: number },
}

const initialState: PersonState = {
    id: 0,
    description: '',
    data: { name: 'Mark', type: 'man', age: 21 },
}

export const personReducer = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setName: (state, action: PayloadAction<PersonName>) => {
            state.data.name = action.payload
        },
        setType: (state, action: PayloadAction<PersonType>) => {
            state.data.type = action.payload
        },
        setAge: (state, action: PayloadAction<number>) => {
            state.data.age = action.payload
        },
        reset: () => initialState,
    },
})

export const { setId, setDescription, setName, setType, setAge, reset } = personReducer.actions

export default personReducer.reducer
