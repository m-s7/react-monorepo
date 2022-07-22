import React, { useEffect, useState } from 'react'
import AppRouter from '@/app-router'
import { AuthProvider, FirebaseAuthProvider, FirebaseAuthProviderProps, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'
import { FullPageError, FullPageLoader } from '@ms7/ui'
import { env } from '@ms7/common'
import i18n from '@/i18n'
import { I18nextProvider } from 'react-i18next'

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
        // <AuthProvider<FirebaseAuthProviderProps>
        //     provider={FirebaseAuthProvider}
        //     providerProps={{
        //         options: {
        //             apiKey: env.REACT_APP_FIREBASE_API_KEY,
        //             authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        //             projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
        //             storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        //             messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        //             appId: env.REACT_APP_FIREBASE_APP_ID,
        //         },
        //     }}>
        <I18nextProvider i18n={i18n}>
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
                {showLoader ? <FullPageLoader header={env.REACT_APP_NAME} /> : <AppRouter />}
            </AuthProvider>
        </I18nextProvider>
    )
}

export default App
