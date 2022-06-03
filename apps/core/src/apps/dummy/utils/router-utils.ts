import config from 'Dummy/configs/app'
import { isEmpty } from 'lodash'
import { getBaseUrlForModule } from '@/utils/router-utils'

export const getBaseUrl = (path?: string): string => {
    if(isEmpty(path)) path = ''

    return `${getBaseUrlForModule(config)}/${path}`
}
