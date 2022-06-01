import { isProd } from '@/utils/app-utils'

describe('app-utils', () => {
    const originalNodeEnv = process.env.NODE_ENV

    beforeEach(() => {
        jest.resetModules()
    })

    afterEach(() => {
        process.env = Object.assign(process.env, { NODE_ENV: originalNodeEnv })
    })

    describe('when getting isProd value', () => {
        it('should return true when app is in production env', async () => {
            process.env = Object.assign(process.env, { NODE_ENV: 'production' })

            expect(isProd()).toBe(true)
        })

        it('should return false when app is not in production env', async () => {
            process.env = Object.assign(process.env, { NODE_ENV: 'unknown' })

            expect(isProd()).toBe(false)
        })
    })
})
