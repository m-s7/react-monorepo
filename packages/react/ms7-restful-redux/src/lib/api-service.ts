import axios, { AxiosInstance } from 'axios'
import { getThunk, postThunk, putThunk, patchThunk, removeThunk } from './rest-reducer'

class ApiService {
    private store: any
    public static service: AxiosInstance

    constructor() {
        ApiService.service = axios.create()
    }

    public setStore(store: any) {
        this.store = store
    }

    public setupApiServiceInterceptors(token: string, logout: () => void) {
        ApiService.service.interceptors.response.use(
            config => config,
            error => {
                if(error.status === 401)
                    logout()

                return Promise.reject(error)
            })

        ApiService.service.interceptors.request.use(
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

    public get<R>(url: string) {
        if(!this.store) this.throwUninitializedStoreError()

        return this.store.dispatch(getThunk<R>()(url))
    }

    public post<R, D>(url: string, body: D) {
        if(!this.store) this.throwUninitializedStoreError()

        return this.store.dispatch(postThunk<R, D>()({ url, body }))
    }

    public put<R, D>(url: string, body: D) {
        if(!this.store) this.throwUninitializedStoreError()

        return this.store.dispatch(putThunk<R, D>()({ url, body }))
    }

    public patch<R, D>(url: string, body: D) {
        if(!this.store) this.throwUninitializedStoreError()

        return this.store.dispatch(patchThunk<R, D>()({ url, body }))
    }

    public remove(url: string) {
        if(!this.store) this.throwUninitializedStoreError()

        return this.store.dispatch(removeThunk()(url))
    }
    
    private throwUninitializedStoreError() {
        throw new Error('You must pass a valid store instance to use this service')
    }
}

export default ApiService