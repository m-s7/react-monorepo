import { LogLevel } from './logger'

export const getLogLevelForEnv = (isDev: boolean, devLogLevel: LogLevel = LogLevel.TRACE, prodLogLevel: LogLevel = LogLevel.INFO): LogLevel => {
    const envLogLevel = process.env.REACT_APP_LOG_LEVEL
    if(envLogLevel && (Object.values(LogLevel) as string[]).includes(envLogLevel))
        return envLogLevel as LogLevel

    return (isDev ? devLogLevel : prodLogLevel)
}

export const assignLevelToLoggers = (loggers: string[], level: LogLevel): { [x: string]: LogLevel } => loggers.reduce((acc, item) => ({ ...acc, [item]: level }), {})