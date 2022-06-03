import ApiService from './lib/api-service'

const ApiServiceInstance = new ApiService()

export { AxiosError } from 'axios'
export { restReducer, restSlice } from './lib/rest-reducer'

export type { AxiosResponse } from 'axios'

export default ApiServiceInstance