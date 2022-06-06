export { AuthProvider, AuthProviderContext } from './lib/auth-provider'
export { KeycloakAuthProvider } from './lib/keycloak/keycloak-auth-provider'

export type { AuthModel } from './lib/auth-provider'
export type { KeycloakAuthProviderProps } from './lib/keycloak/keycloak-auth-provider'

export enum Role {
    ADMIN = 2,
    USER = 1,
    GUEST = 0,
}