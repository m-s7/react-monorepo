import { EventEmitter } from 'events'

export enum LogLevel {
    NONE = 'none',
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

export interface LogEntry {
    level: LogLevel,
    module: string,
    location?: string,
    message: string,
    data: unknown[],
}

export class Logger {
    private readonly logManager: EventEmitter
    private readonly minLevel: number
    private readonly module: string

    private readonly caller: Error | undefined

    private readonly levels: { readonly [key: string]: number } = {
        'trace': 1,
        'debug': 2,
        'info': 3,
        'warn': 4,
        'error': 5,
    }

    constructor(logManager: EventEmitter, module: string, minLevel: LogLevel, caller: Error | undefined = undefined) {
        this.logManager = logManager
        this.module = module
        this.minLevel = this.levelToInt(minLevel)
        this.caller = caller
    }

    private levelToInt(minLevel: LogLevel): number {
        if(minLevel.toLowerCase() in this.levels)
            return this.levels[minLevel]
        else
            return 99
    }

    public log(logLevel: LogLevel, message: string, data: unknown[]): void {
        const level = this.levelToInt(logLevel)
        if(level < this.minLevel) return

        const logEntry: LogEntry = { level: logLevel, module: this.module, message, data }

        // const error = new Error('')
        // if(error.stack) {
        //     const cla = error.stack.split('\n')
        //     const idx = (cla.length - 2)
        //     const search = cla[idx]
        //
        //     const index = search.indexOf('at async ')
        //     const sliceStart = (index > -1 ? index + 9 : search.indexOf('at ') + 3)
        //
        //     logEntry.location = search.slice(sliceStart, cla[idx].length)
        // }

        this.logManager.emit('log', logEntry)
    }

    public trace(message: string, ...data: unknown[]): void {
        this.log(LogLevel.TRACE, message, data)
    }

    public debug(message: string, ...data: unknown[]): void {
        this.log(LogLevel.DEBUG, message, data)
    }

    public info(message: string, ...data: unknown[]): void {
        this.log(LogLevel.INFO, message, data)
    }

    public warn(message: string, ...data: unknown[]): void {
        this.log(LogLevel.WARN, message, data)
    }

    public error(message: string, ...data: unknown[]): void {
        this.log(LogLevel.ERROR, message, data)
    }
}