export { AuthProvider, AuthProviderContext } from './lib/auth-provider'
export { FirebaseAuthProvider } from './lib/firebase/firebase-auth-provider'
export { KeycloakAuthProvider } from './lib/keycloak/keycloak-auth-provider'
export { withAuth } from './lib/hoc-authenticate'
export { authReducer, setToken } from './lib/auth-reducer'

export type { AuthState } from './lib/auth-reducer'
export type { AuthModel, UserInfo } from './lib/auth-provider'
export type { FirebaseAuthProviderProps } from './lib/firebase/firebase-auth-provider'
export type { KeycloakAuthProviderProps } from './lib/keycloak/keycloak-auth-provider'

export enum Role {
    ADMIN = 2,
    USER = 1,
    GUEST = 0,
}