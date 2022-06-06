interface Dictionary<T> { [x: string]: T }
export type StringDictionary = Dictionary<string>
export type CustomTypeDictionary<T> = Dictionary<T>

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
export type Necessary<T, K extends keyof T> = T & { [P in K]-?: T[P] }
