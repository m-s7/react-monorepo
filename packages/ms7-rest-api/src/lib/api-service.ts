import axios, { AxiosInstance } from 'axios'
import { getThunk, postThunk, putThunk, patchThunk, removeThunk, restSlice } from './rest-reducer'
import { apiSubject } from './api-subject'

class ApiService {
    private store: any
    public static service: AxiosInstance

    constructor() {
        ApiService.service = axios.create()
    }

    public setStore(store: any) {
        if(!store || !store.getState())
            throw new Error('Invalid store instance')

        for(const key of Object.keys(store.getState())) {
            const reducer = store.getState()[key]
            if(JSON.stringify(Object.keys(reducer)) === JSON.stringify(Object.keys(restSlice.getInitialState()))) {
                this.store = store

                return
            }
        }

        throw new Error('Invalid store instance, store must contain restReducer')
    }

    public setupApiServiceInterceptors(token: string | undefined, logoutUrl: URL | undefined) {
        ApiService.service.interceptors.request.use(
            config => {
                apiSubject.next({ isLoading: true })

                const headers = config?.headers
                if(headers && token) {
                    if(token) headers['Authorization'] = `Bearer ${token}`
                    if(!headers['Content-Type']) headers['Content-Type'] = 'application/json'
                }

                return config
            },
            error => {
                apiSubject.next({ isLoading: false })
                Promise.reject(error)
            })

        ApiService.service.interceptors.response.use(
            config => {
                apiSubject.next({ isLoading: false })

                return config
            },
            error => {
                apiSubject.next({ isLoading: false })

                if(error.status === 401 && logoutUrl)
                    window.location.replace(logoutUrl)

                return Promise.reject(error)
            })
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