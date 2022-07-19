import React, { useEffect, useState } from 'react'
import AppRouter from '@/app-router'
import { AuthProvider, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'
import { FullPageError, FullPageLoader } from '@ms7/bui'
import { env } from '@ms7/common'
import i18n from '@/i18n'
import { I18nextProvider } from 'react-i18next'
import { FirebaseOptions } from 'firebase/app'
import FirebaseAuthProvider, { FirebaseAuthProviderProps } from '@/business/firebase/firebase-auth-provider'
import Login from '@/components/layout/pages/login'

const options: FirebaseOptions = {
    apiKey: 'AIzaSyDnVIFqbDjHSC7KcK5rNSW8iMvM4yCGsHk',
    authDomain: 'ms7-codebase.firebaseapp.com',
    projectId: 'ms7-codebase',
    storageBucket: 'ms7-codebase.appspot.com',
    messagingSenderId: '262749858061',
    appId: '1:262749858061:web:55b69608fbe7c7af9ca844',
}

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
        // <AuthProvider<KeycloakAuthProviderProps>
        //     provider={KeycloakAuthProvider}
        //     providerProps={{
        //         config: { url: env.REACT_APP_KEYCLOAK_URL, realm: env.REACT_APP_KEYCLOAK_REALM, clientId: env.REACT_APP_KEYCLOAK_CLIENTID },
        //         errorComponent: (props: { error: Error }) => (
        //             <FullPageError
        //                 error={props.error}
        //                 header={env.REACT_APP_NAME} />),
        //         suspenseComponent: () => (<FullPageLoader header={env.REACT_APP_NAME} />),
        //     }}>
        <I18nextProvider i18n={i18n}>
            <AuthProvider<FirebaseAuthProviderProps>
                provider={FirebaseAuthProvider}
                providerProps={{
                    options,
                    loginComponent: Login,
                    suspenseComponent: () => (<FullPageLoader header={env.REACT_APP_NAME} />),
                }}>
                {showLoader ? <FullPageLoader header={env.REACT_APP_NAME} /> : <AppRouter />}
            </AuthProvider>
        </I18nextProvider>
    )
}

export default App
