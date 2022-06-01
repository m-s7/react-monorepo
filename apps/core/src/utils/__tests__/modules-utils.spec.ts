import { f } from '@/tests/utils/assertions-utils'
import { requireApp, getConfigFiles } from '@/utils/webpack-utils'

jest.mock('@/utils/webpack-utils')
jest.mock('@/services/config-manager')
jest.mock('@/models/logger/logger')

describe('apps-utils', () => {
    describe('when getting apps configs', () => {
        beforeEach(() => {
            f(getConfigFiles).mockReturnValue({ './src/apps/dummy1/config/module.ts': {}, './src/apps/dummy2/config/module.tx': {}, 'invalid/path':{}, '': {}})
        })

        afterEach(() => {
            jest.restoreAllMocks()
        })

        it('should return configuration for active apps', () => {
            f(requireApp)
                .mockReturnValueOnce({ default: () => ({ name: 'dummy1', key: 'test-key1', active: true }) })
                .mockReturnValueOnce({ default: () => ({ name: 'dummy2', key: 'test-key2', active: false }) })
                .mockReturnValueOnce({ default: () => ({ name: 'dummy3', key: 'test-key3', active: true }) })

            // const configs = getAppsConfigs()
            // expect(configs).toStrictEqual([
            //     { name: 'dummy1', key: 'test-key1', active: true },
            //     { name: 'dummy3', key: 'test-key3', active: true },
            // ])
        })

        it('should return empty array when no active app found', () => {
            // expect(getAppsConfigs()).toEqual([])
        })
    })
})

export {}