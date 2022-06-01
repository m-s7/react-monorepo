import axios from 'axios'
import store from '@/store/store'
import { getThunk, postThunk, putThunk, patchThunk, removeThunk } from '@/store/reducers/rest-reducer'

const ApiService = axios.create()

export const setupApiServiceInterceptors = (token: string, logout: () => void) => {
    ApiService.interceptors.response.use(
        config => config,
        error => {
            if(error.status === 401)
                logout()

            return Promise.reject(error)
        })

    ApiService.interceptors.request.use(
        config => {
            const headers = config?.headers
            if(headers) {
                if(token) headers['Authorization'] = `Bearer ${token}`
                if(!headers['Content-Type']) headers['Content-Type'] = 'application/json'
            }

            return config
        },
        error => Promise.reject(error))
}

export const get = <R>(url: string) => store.dispatch(getThunk<R>()(url))
export const post = <R, D>(url: string, body: D) => store.dispatch(postThunk<R, D>()({ url, body }))
export const put = <R, D>(url: string, body: D) => store.dispatch(putThunk<R, D>()({ url, body }))
export const patch = <R, D>(url: string, body: D) => store.dispatch(patchThunk<R, D>()({ url, body }))
export const remove = (url: string) => store.dispatch(removeThunk()(url))

export default ApiService