import { f } from '@/tests/utils/assertions-utils'
import { assignLevelToLoggers, getLogLevelForEnv } from '@/utils/logger-utils'
import { isProd } from '@/utils/app-utils'
import { LogLevel } from '@/constants/logger'

jest.mock('@/utils/app-utils')

describe('logger-utils', () => {
    describe('when getting log level for environment', () => {
        it('should return info level when in production mode', () => {
            f(isProd).mockReturnValueOnce(true)

            expect(getLogLevelForEnv()).toBe(LogLevel.INFO)
        })

        it('should return trace level when not in production mode', () => {
            f(isProd).mockReturnValueOnce(false)

            expect(getLogLevelForEnv()).toBe(LogLevel.TRACE)
        })
    })
    
    describe('when assign level to loggers', () => {
        it('should assign correct level to each logger', () => {
            expect(assignLevelToLoggers(['test', 'other', ''], LogLevel.DEBUG)).toStrictEqual({ test: LogLevel.DEBUG, other: LogLevel.DEBUG, '': LogLevel.DEBUG })
        })
    })
})
