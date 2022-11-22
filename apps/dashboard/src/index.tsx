import React, { Suspense, useEffect } from 'react'
import App from '@/app'
import { createRoot } from 'react-dom/client'
import { logging, assignLevelToLoggers, getLogLevelForEnv } from '@ms7/logger'
import 'bootstrap/dist/css/bootstrap.min.css'
import { env, isDev } from '@ms7/common'
import { FullPageSpinner, FullPageError } from '@ms7/ui'
import { BrowserRouter } from 'react-router-dom'
import '@fortawesome/fontawesome-svg-core'
import i18n from '@/i18n'
import { I18nextProvider } from 'react-i18next'
import '@/assets/styles/index.css'
import { AuthProvider, FirebaseAuthProvider, FirebaseAuthProviderProps, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth'
import Theme from '@/components/theme'

logging.configure({ minLevels: assignLevelToLoggers(['', 'dashboard'], getLogLevelForEnv(isDev())) }).registerConsoleLogger()

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <Theme>
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<FullPageSpinner useDefaults />}>
                    <BrowserRouter>
                        <AuthProvider<FirebaseAuthProviderProps>
                            provider={FirebaseAuthProvider}
                            providerProps={{
                                options: {
                                    apiKey: env.REACT_APP_FIREBASE_API_KEY,
                                    authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                                    projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
                                    storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
                                    messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
                                    appId: env.REACT_APP_FIREBASE_APP_ID,
                                },
                            }}>
                            <App />
                        </AuthProvider>
                    </BrowserRouter>
                </Suspense>
            </I18nextProvider>
        </Theme>
    </React.StrictMode>,
)

// <AuthProvider<KeycloakAuthProviderProps>
// provider={KeycloakAuthProvider}
// providerProps={{
//     config: { url: env.REACT_APP_KEYCLOAK_URL, realm: env.REACT_APP_KEYCLOAK_REALM, clientId: env.REACT_APP_KEYCLOAK_CLIENTID },
//     errorComponent: (props: { error: Error }) => (
//         <FullPageError
//             error={props.error}
//             header={env.REACT_APP_NAME} />),
//         suspenseComponent: () => (<FullPageSpinner header={env.REACT_APP_NAME} />),
// }}>

