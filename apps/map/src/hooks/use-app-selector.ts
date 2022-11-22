import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'Map/store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
