import { useDispatch } from 'react-redux'
import { AppDispatch } from 'Core/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
