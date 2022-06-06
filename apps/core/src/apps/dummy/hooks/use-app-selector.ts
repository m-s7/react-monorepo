import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'Dummy/store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
