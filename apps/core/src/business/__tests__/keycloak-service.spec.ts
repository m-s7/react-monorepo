import { f } from '@/tests/utils/assertions-utils'
import { getConfigValue } from '@/business/config-manager'
// import { getUserInfo } from '@/services/api/keycloak-api'
import FatalError from '@/business/models/errors/fatal-error'

jest.mock('@/services/config-manager')
jest.mock('@/services/api/keycloak-api')
jest.mock('keycloak-js', () => ({
    __esModule: true,
    default: () => ({
        init: () => new Promise((resolve, reject) => {
            (mockIsResolved ? resolve(mockIsAuthenticated) : reject('test-reason'))
        }),
        onReady: jest.fn(),
        authenticated: mockIsAuthenticated,
        token: (mockIsAuthenticated ? '12345' : undefined),
    }),
    init: jest.fn(),
    // authenticated: () => mockIsAuthenticated,
}))

let mockIsResolved = true
let mockIsAuthenticated = true

const mockWindowLocation = () => {
    // @ts-ignore
    const location: window.URL = new URL('https://test.com')
    location.replace = jest.fn()
    // @ts-ignore
    delete window.location
    window.location = location
}

describe('keycloak-service', () => {
    const callback = jest.fn()

    describe('when initializing', () => {
        describe('should call callback with fatal error when', () => {
            it('url is falsy', () => {
                // KeycloakManager.init(callback)

                expect(callback).toHaveBeenCalledWith(false, new FatalError('Keycloak', 'Missing `url`'))
            })

            it('realm is falsy', () => {
                f(getConfigValue).mockReturnValueOnce('test-url')
                // KeycloakManager.init(callback)

                expect(callback).toHaveBeenCalledWith(false, new FatalError('Keycloak', 'Missing `realm`'))
            })

            it('clientId is falsy', () => {
                f(getConfigValue)
                    .mockReturnValueOnce('test-url')
                    .mockReturnValueOnce('test-realm')
                // KeycloakManager.init(callback)

                expect(callback).toHaveBeenCalledWith(false, new FatalError('Keycloak', 'Missing `clientId`'))
            })
        })

        describe('should initialize keycloak instance', () => {
            beforeEach(() => {
                f(getConfigValue)
                    .mockReturnValueOnce('test-url')
                    .mockReturnValueOnce('test-realm')
                    .mockReturnValueOnce('test-clientId')
            })

            it('and authenticate user if user was authenticated', async () => {
                mockIsResolved = true
                mockIsAuthenticated = true

                // await KeycloakManager.init(callback)

                expect(callback).toHaveBeenCalledWith(true)
            })

            it('and not authenticate user is user was not authenticated', async () => {
                mockIsResolved = true
                mockIsAuthenticated = false

                // await KeycloakManager.init(callback)

                expect(callback).toHaveBeenCalledWith(false)
            })

            it('and throw error when authentication error occurred', async () => {
                mockIsResolved = false

                try {
                    // await KeycloakManager.init(callback)
                }
                catch(error) {
                    expect(error).toBe('test-reason')
                }
            })
        })
    })

    describe('when', () => {
        beforeEach(async () => {
            f(getConfigValue)
                .mockReturnValueOnce('test-url')
                .mockReturnValueOnce('test-realm')
                .mockReturnValueOnce('test-clientId')

            mockIsResolved = true
        })

        describe('getting authentication status', () => {
            it('should return true if user is authenticated', async () => {
                mockIsAuthenticated = true
                // await KeycloakManager.init(callback)

                // expect(KeycloakManager.isAuthenticated()).toBe(true)
            })

            it('should return falsy if user is not authenticated', async () => {
                mockIsAuthenticated = false
                // await KeycloakManager.init(callback)

                // expect(KeycloakManager.isAuthenticated()).toBeFalsy()
            })
        })

        describe('getting token', () => {
            it('should return token when user is authenticated', async () => {
                mockIsAuthenticated = true
                // await KeycloakManager.init(callback)

                // expect(KeycloakManager.getToken()).toBeTruthy()
            })

            it('should return falsy value when user is not authenticated', async () => {
                mockIsAuthenticated = false
                // await KeycloakManager.init(callback)

                // expect(KeycloakManager.getToken()).toBeFalsy()
            })
        })

        it('logging out should redirect to keycloak logout page', async () => {
            mockIsResolved = true
            mockIsAuthenticated = false

            // await KeycloakManager.init(callback)

            mockWindowLocation()

            f(getConfigValue)
                .mockReturnValueOnce('keycloak-url')
                .mockReturnValueOnce('keycloak-realm')

            // KeycloakManager.logout()

            expect(window.location.replace).toHaveBeenCalledWith('keycloak-url/realms/keycloak-realm/protocol/openid-connect/logout?redirect_uri=https://test.com')
        })
        
        describe('validating token', () => {
            beforeEach(() => {
                mockIsAuthenticated = true
                // KeycloakManager.init(callback)
            })
            
            // it('should validate token', async () => {
            //     f(getUserInfo).mockImplementation(() => new Promise(resolve => {
            //         resolve({ res: { status: 200 }})
            //     }))
            //
            //     await KeycloakManager.validateToken()
            //
            //     expect(getUserInfo).toHaveBeenCalledTimes(1)
            // })
            //
            // it('should call logout when response has unauthorized status', async () => {
            //     f(getConfigValue)
            //         .mockReturnValueOnce('keycloak-url')
            //         .mockReturnValueOnce('keycloak-realm')
            //     f(getUserInfo).mockImplementation(() => new Promise(resolve => {
            //         resolve({ status: 401 })
            //     }))
            //
            //     mockWindowLocation()
            //     await KeycloakManager.validateToken()
            //
            //     expect(getUserInfo).toHaveBeenCalledTimes(1)
            //     expect(window.location.replace).toHaveBeenCalledWith('keycloak-url/realms/keycloak-realm/protocol/openid-connect/logout?redirect_uri=https://test.com')
            // })
        })
    })
})
