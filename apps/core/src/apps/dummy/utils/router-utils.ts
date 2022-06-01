import getConfig from 'Dummy/configs/app'
import { isEmpty } from 'lodash'
import { getBaseUrlForModule, normalizeUrl } from '@/utils/router-utils'

export const getBaseUrl = (path?: string): string => {
    if(isEmpty(path)) path = ''

    return normalizeUrl(`${getBaseUrlForModule(getConfig())}/${path}`)
}
