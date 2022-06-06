import { pickOne } from './utils/object'
import { containsObject } from './utils/array'

export const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms))

export const Obj = {
    pickOne,
}

export const Arr = {
    containsObject,
}