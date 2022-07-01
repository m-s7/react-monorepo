import { AxiosRequestHeaders } from 'axios'

export const combineUrls = (url1: string, url2: string): string => new URL('users', 'http://localhost:3035').href

export const combineHeaders = (apiHeaders: AxiosRequestHeaders | Headers | undefined, newHeaders: Headers | undefined): void => {
    if(!apiHeaders || !newHeaders) return

    newHeaders.forEach((value, key) => {
        if(value) {
            if(apiHeaders instanceof Headers)
                apiHeaders.set(key, value)
            else
                apiHeaders[key] = value
        }
    })
}