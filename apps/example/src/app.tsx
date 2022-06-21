import React from 'react'
import AppRouter from '@/app-router'
import { AuthProvider, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'
import { FullPageError, FullPageLoader } from '@ms7/bui'
import { env } from '@ms7/common'

const App = () => (
    <AuthProvider<KeycloakAuthProviderProps>
        provider={KeycloakAuthProvider}
        providerProps={{
            config: { url: env.REACT_APP_KEYCLOAK_URL, realm: env.REACT_APP_KEYCLOAK_REALM, clientId: env.REACT_APP_KEYCLOAK_CLIENTID },
            errorComponent: (props: { error: Error }) => (
                <FullPageError
                    error={props.error}
                    header={env.REACT_APP_NAME} />),
            suspenseComponent: () => (<FullPageLoader header={env.REACT_APP_NAME} />),
        }}>
        <AppRouter />
    </AuthProvider>
)

export default App
