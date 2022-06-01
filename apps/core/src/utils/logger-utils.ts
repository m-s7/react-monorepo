import { LogLevel } from '@/constants/logger'
import { isProd } from '@/utils/app-utils'
import { LogLevelDictionary } from '@/business/models/common'

export const getLogLevelForEnv = (): LogLevel => {
    const envLogLevel = process.env.REACT_APP_LOG_LEVEL
    if(envLogLevel && (Object.values(LogLevel) as string[]).includes(envLogLevel))
        return envLogLevel as LogLevel

    return (isProd() ? LogLevel.INFO : LogLevel.TRACE)
}

export const assignLevelToLoggers = (loggers: string[], level: LogLevel): LogLevelDictionary => loggers.reduce((acc, item) => ({ ...acc, [item]: level }), {})