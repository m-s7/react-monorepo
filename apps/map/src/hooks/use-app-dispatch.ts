import { useDispatch } from 'react-redux'
import { AppDispatch } from 'Map/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
