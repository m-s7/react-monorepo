import { getBaseUrlForModule, getPathnameFromUrl, getRoutePathname } from '@/utils/router-utils'
import { getConfigValue } from '@/business/config-manager'
import { AppConfig } from '@/business/models/app'

jest.mock('@/services/config-manager', () => ({
    ...(jest.requireActual('@/services/config-manager')),
    getConfigValue: jest.fn(),
}))

describe('router-utils', () => {
    describe('when getting base url', () => {
        let config: unknown
        beforeEach(() => {
            config = { key: 'test-dummy', url: 'test-url' }
        })
        
        it('should return url', () => {
            (getConfigValue as jest.Mock).mockReturnValueOnce('/test/dummy')
            
            expect(getBaseUrlForModule((config as AppConfig))).toBe('/test/dummy')
        })

        it('should return normalized url when url ends with /', () => {
            (getConfigValue as jest.Mock).mockReturnValueOnce('/test/dummy/')

            expect(getBaseUrlForModule((config as AppConfig))).toBe('/test/dummy')
        })

        it('should return empty string when config value does not exist', () => {
            (getConfigValue as jest.Mock).mockReturnValueOnce(undefined)

            expect(getBaseUrlForModule((config as AppConfig))).toBe('')
        })
    })

    describe('when getting pathname from url', () => {
        it('should return pathname', () => {
            expect(getPathnameFromUrl('http://test/example/page/')).toBe('/example/page/')
            expect(getPathnameFromUrl('http://www.test/path/unknown?a=param1&b=param2')).toBe('/path/unknown')
        })
    })

    describe('when getting route pathname', () => {
        it('should return pathname', () => {
            expect(getRoutePathname('void/')).toBe('')
            expect(getRoutePathname('http://test/example/page/')).toBe('')
            expect(getRoutePathname('/test/path/unknown?a=param1&b=param2')).toBe('test')
            expect(getRoutePathname('other/page/parma1')).toBe('page')
        })
    })
})
