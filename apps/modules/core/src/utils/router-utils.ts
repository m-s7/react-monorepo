import config from 'Core/configs/app'
import { isEmpty } from 'lodash'

export const getBaseUrl = (path?: string): string => {
    if(isEmpty(path)) path = ''

    return `${config.apiUrl || ''}/${path}`
}