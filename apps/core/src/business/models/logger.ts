import { LogLevelDictionary } from '@/business/models/common'
import { LogLevel } from '@/constants/logger'

export interface LogOptions { minLevels: LogLevelDictionary }

export interface LogEntry {
    level: LogLevel,
    module: string,
    location?: string,
    message: string,
    data: unknown[],
}