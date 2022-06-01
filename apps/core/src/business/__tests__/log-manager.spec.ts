/* eslint-disable no-console */

import { LogManager } from '@/business/log-manager'
import { LogLevel } from '@/constants/logger'
import { Logger } from '@/business/logger/logger'
describe('log-manager', () => {
    
    let logManager: LogManager
    beforeEach(() => {
        logManager = new LogManager()
    })
    
    it('when configuring should return configured instance', () => {
        logManager.configure({ minLevels: { 'test': LogLevel.INFO }})

        expect(logManager).toBeInstanceOf(LogManager)
        expect(logManager).toEqual(expect.objectContaining({
            consoleLoggerRegistered: false,
            options: { minLevels: { 'test': 'info' }},
        }))
    })

    it('when registering console logger should return instance', () => {
        logManager.registerConsoleLogger()

        expect(logManager).toBeInstanceOf(LogManager)
        expect(logManager).toEqual(expect.objectContaining({
            consoleLoggerRegistered: true,
            options: { minLevels: { '': 'trace' }},
        }))
    })

    it('when adding configuration option should add option', () => {
        logManager.addConfigurationOption({ minLevels: { 'other': LogLevel.ERROR }})

        expect(logManager).toEqual(expect.objectContaining({
            options: { minLevels: { '': 'trace', 'other': 'error' }},
        }))
    })

    describe('when getting logger', () => {
        beforeEach(() => {
            logManager.configure({ minLevels: { 'test': LogLevel.INFO, 'unknown': LogLevel.ERROR }}).registerConsoleLogger()
        })

        it('should return correct logger is module exists', () => {
            const logger = logManager.getLogger('test')

            expect(logger).toBeInstanceOf(Logger)
            expect(logger).toEqual(expect.objectContaining({
                minLevel: 3,
                module: 'test',
            }))
        })

        it('should return logger with default minLevel if module does not exists', () => {
            const logger = logManager.getLogger('other')

            expect(logger).toBeInstanceOf(Logger)
            expect(logger).toEqual(expect.objectContaining({
                minLevel: 99,
                module: 'other',
            }))
        })
    })

    describe('when logging message should', () => {
        const consoleData = { key: 'test-data', data: [1, 2, 3] }

        beforeEach(() => {
            logManager.configure({ minLevels: { 'test': LogLevel.TRACE, 'unknown': LogLevel.ERROR }}).registerConsoleLogger()
        })

        it('call trace console logger', () => {
            jest.spyOn(console, 'trace')

            const logger = logManager.getLogger('test')

            logger.trace('test-message', consoleData)
            expect(console.trace).toHaveBeenCalledTimes(1)
            expect(console.trace).toHaveBeenCalledWith(expect.stringContaining('[test] test-message'), consoleData)
        })

        it('call debug console logger', () => {
            jest.spyOn(console, 'debug')

            const logger = logManager.getLogger('test')

            logger.debug('test-message', consoleData)
            // eslint-disable no-console
            expect(console.debug).toHaveBeenCalledTimes(1)
            expect(console.debug).toHaveBeenCalledWith(expect.stringContaining('[test] test-message'), consoleData)
        })

        it('call info console logger', () => {
            jest.spyOn(console, 'info')

            const logger = logManager.getLogger('test')

            logger.info('test-message', consoleData)
            expect(console.info).toHaveBeenCalledTimes(1)
            expect(console.info).toHaveBeenCalledWith(expect.stringContaining('[test] test-message'), consoleData)
        })

        it('call warn console logger', () => {
            jest.spyOn(console, 'warn')

            const logger = logManager.getLogger('test')

            logger.warn('test-message', consoleData)
            expect(console.warn).toHaveBeenCalledTimes(1)
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('[test] test-message'), consoleData)
        })

        it('call error console logger', () => {
            jest.spyOn(console, 'error')

            const logger = logManager.getLogger('test')

            logger.error('test-message', consoleData)
            expect(console.error).toHaveBeenCalledTimes(1)
            expect(console.error).toHaveBeenCalledWith(expect.stringContaining('[test] test-message'), consoleData)
        })

        describe('not call', () => {
            const callLogger = (logger: Logger, message: string) => {
                logger.trace(message)
                logger.debug(message)
                logger.info(message)
                logger.warn(message)
                logger.error(message)
            }

            beforeEach(() => {
                jest.spyOn(console, 'trace')
                jest.spyOn(console, 'debug')
                jest.spyOn(console, 'info')
                jest.spyOn(console, 'warn')
                jest.spyOn(console, 'error')
            })

            it('trace, debug, info or warn if log level is error', () => {
                logManager.addConfigurationOption({ minLevels: { 'lgr': LogLevel.ERROR }})
                const logger = logManager.getLogger('lgr')

                callLogger(logger, '')

                expect(console.trace).not.toHaveBeenCalled()
                expect(console.debug).not.toHaveBeenCalled()
                expect(console.info).not.toHaveBeenCalled()
                expect(console.warn).not.toHaveBeenCalled()
            })

            it('trace, debug or info if log level is warn', () => {
                logManager.addConfigurationOption({ minLevels: { 'lgr': LogLevel.WARN }})
                const logger = logManager.getLogger('lgr')

                callLogger(logger, '')

                expect(console.trace).not.toHaveBeenCalled()
                expect(console.debug).not.toHaveBeenCalled()
                expect(console.info).not.toHaveBeenCalled()
            })

            it('trace or debug if log level is info', () => {
                logManager.addConfigurationOption({ minLevels: { 'lgr': LogLevel.INFO }})
                const logger = logManager.getLogger('lgr')

                callLogger(logger, '')

                expect(console.trace).not.toHaveBeenCalled()
                expect(console.debug).not.toHaveBeenCalled()
            })

            it('trace if log level is debug', () => {
                logManager.addConfigurationOption({ minLevels: { 'lgr': LogLevel.DEBUG }})
                const logger = logManager.getLogger('lgr')

                callLogger(logger, '')

                expect(console.trace).not.toHaveBeenCalled()
            })
        })
    })
})

export {}