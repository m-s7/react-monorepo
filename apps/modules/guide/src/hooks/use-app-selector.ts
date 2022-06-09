import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'Guide/store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
