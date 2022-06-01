import { f } from '@/tests/utils/assertions-utils'
import ConfigManager from '@/business/config-manager'
import FatalError from '@/business/models/errors/fatal-error'
import { getConfig, getConfigValue } from '@/business/config-manager'

const mockFetch = (data: string) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            blob: () => Promise.resolve(
                { text: () => data },
            ),
        }),
    ) as jest.Mock
}

describe('config-manager', () => {
    const originalEnv = process.env

    beforeEach(() => {
        jest.resetModules()

        process.env = Object.assign(process.env, { DUMMY_VAL1: 'val1' })
        process.env = Object.assign(process.env, { DUMMY_VAL2: 'val2' })
        process.env = Object.assign(process.env, { DUMMY_VAL1_OTHER: 'val1_other' })
    })

    afterEach(() => {
        f(global.fetch).mockClear()
        process.env = originalEnv
    })

    describe('when loading config with proper config', () => {
        const configManager = new ConfigManager()

        beforeEach(async () => {
            mockFetch('dummy1:\n' +
                '  val1: ${DUMMY_VAL1}\n' +
                '  val2: ${DUMMY_VAL2}\n' +
                'dummy2:\n' +
                '  val1: ${DUMMY_VAL1_OTHER}')

            await configManager.loadConfig()
        })

        it('should load config', async () => {
            expect(configManager.config).toEqual({
                dummy1: { val1: 'val1', val2: 'val2' },
                dummy2: { val1: 'val1_other' },
            })
        })

        it('and getting config should return config', () => {
            expect(getConfig()).toEqual({
                dummy1: { val1: 'val1', val2: 'val2' },
                dummy2: { val1: 'val1_other' },
            })
        })
        
        it('and getting config value should return value', () => {
            expect(getConfigValue('dummy1', 'val1')).toBe('val1')
            expect(getConfigValue('dummy1', 'val2')).toBe('val2')
            expect(getConfigValue('dummy2', 'val1')).toBe('val1_other')
        })

        it('and getting invalid config value should return undefined', () => {
            expect(getConfigValue('dummy1', 'val3')).toBe(undefined)
        })
        
        it('and loading config the 2nd time should not load new config', async () => {
            mockFetch('dummy3:\n  val1: ${DUMMY_VAL3}')

            await configManager.loadConfig()

            expect(configManager.config).toEqual({
                dummy1: { val1: 'val1', val2: 'val2' },
                dummy2: { val1: 'val1_other' },
            })
        })
    })

    describe('when loading config with invalid config', () => {
        const configManager = new ConfigManager()

        beforeEach(async () => {
            mockFetch('invalid')
        })

        it('should throw fatal error', async () => {
            try {
                await configManager.loadConfig()
            }
            catch(error) {
                expect(error).toEqual(new FatalError('Config', 'Invalid syntax or file does not exist'))
            }
        })
    })
})
