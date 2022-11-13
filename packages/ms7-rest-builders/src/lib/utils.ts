import { RawAxiosRequestHeaders } from 'axios'

export const combineUrls = (url: string, baseUrl: string): string => new URL(url, baseUrl).href

export const combineHeaders = (apiHeaders: RawAxiosRequestHeaders | Headers | undefined, newHeaders: Headers | undefined): void => {
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