import { useDispatch } from 'react-redux'
import { AppDispatch } from 'Dummy/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
