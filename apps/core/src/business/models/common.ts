import { Reducer } from '@reduxjs/toolkit'
import { LogLevel } from '@/constants/logger'

interface Dictionary<T> { [x: string]: T }
export type StringDictionary = Dictionary<string>
export type ReducerDictionary = Dictionary<Reducer>
export type LogLevelDictionary = Dictionary<LogLevel>
export type CustomTypeDictionary<T> = Dictionary<T>

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
export type Necessary<T, K extends keyof T> = T & { [P in K]-?: T[P] }
