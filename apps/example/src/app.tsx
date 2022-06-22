import React, { useEffect, useState } from 'react'
import AppRouter from '@/app-router'
import { AuthProvider, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'
import { FullPageError, FullPageLoader } from '@ms7/bui'
import { env } from '@ms7/common'
import i18n from '@/i18n'

const App = () => {
    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        i18n.on('languageChanged', () => {
            setShowLoader(true)
            window.location.reload()
        })
    }, [])

    useEffect(() => () => {
        i18n.off('languageChanged')
    }, [])
    
    return (
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
            {showLoader ? <FullPageLoader header={env.REACT_APP_HOMEPAGE_NAME} /> : <AppRouter />}
        </AuthProvider>
    )
}

export default App
