import { EventEmitter } from 'events'
import { Logger } from '@/business/logger/logger'
import { LogLevel } from '@/constants/logger'
import { LogEntry, LogOptions } from '@/business/models/logger'

export class LogManager extends EventEmitter {
    private options: LogOptions = {
        minLevels: {
            '': LogLevel.TRACE,
        },
    }

    private consoleLoggerRegistered = false

    public configure(options: LogOptions): LogManager {
        this.options = Object.assign({}, this.options, options)
        return this
    }

    public addConfigurationOption(options: LogOptions): void {
        this.options = { minLevels: { ...this.options.minLevels, ...options.minLevels }}
    }

    public getLogger(module: string): Logger {
        let minLevel = LogLevel.NONE
        let match = ''

        for(const key in this.options.minLevels) {
            if(module.startsWith(key) && key.length >= match.length) {
                minLevel = this.options.minLevels[key]
                match = key
            }
        }

        return new Logger(this, module, minLevel)
    }

    public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
        this.on('log', listener)
        return this
    }

    public registerConsoleLogger(): LogManager {
        if(this.consoleLoggerRegistered) return this

        this.onLogEntry(logEntry => {
            // const msg = `${logEntry.location} [${logEntry.module}] ${logEntry.message}`
            const msg = `[${logEntry.module}] ${logEntry.message}`
            switch(logEntry.level) {
                case LogLevel.TRACE:
                    // eslint-disable-next-line no-console
                    console.trace(msg, ...logEntry.data)
                    break
                case LogLevel.DEBUG:
                    // eslint-disable-next-line no-console
                    console.debug(msg, ...logEntry.data)
                    break
                case LogLevel.INFO:
                    // eslint-disable-next-line no-console
                    console.info(msg, ...logEntry.data)
                    break
                case LogLevel.WARN:
                    // eslint-disable-next-line no-console
                    console.warn(msg, ...logEntry.data)
                    break
                case LogLevel.ERROR:
                    // eslint-disable-next-line no-console
                    console.error(msg, ...logEntry.data)
                    break
                default:
                    // eslint-disable-next-line no-console
                    console.log(`{${logEntry.level}} ${msg}`, ...logEntry.data)
            }
        })

        this.consoleLoggerRegistered = true
        return this
    }
}

export const logging = new LogManager()