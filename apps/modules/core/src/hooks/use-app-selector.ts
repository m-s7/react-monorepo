import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'Core/store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
