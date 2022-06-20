import { pickOne } from './utils/object'
import { containsObject } from './utils/array'

export const isDev = (): boolean => (process.env.NODE_ENV !== 'production')
export const isProd = (): boolean => (process.env.NODE_ENV === 'production')
export const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms))

export const Obj = {
    pickOne,
}

export const Arr = {
    containsObject,
}