import { useDispatch } from 'react-redux'
import { AppDispatch } from 'Guide/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
