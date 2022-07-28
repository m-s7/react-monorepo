import React, { Suspense } from 'react'
import App from '@/app'
import { createRoot } from 'react-dom/client'
import { logging, assignLevelToLoggers, getLogLevelForEnv } from '@ms7/logger'
import 'bootstrap/dist/css/bootstrap.min.css'
import { env, isDev } from '@ms7/common'
import { FullPageSpinner, FullPageError } from '@ms7/ui'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from '@ms7/router'
import '@fortawesome/fontawesome-svg-core'
import i18n from '@/i18n'
import { I18nextProvider } from 'react-i18next'
import '@/assets/styles/index.css'
import {
    AuthProvider,
    FirebaseAuthProvider,
    FirebaseAuthProviderProps,
    KeycloakAuthProvider,
    KeycloakAuthProviderProps,
} from '@ms7/auth'

logging.configure({ minLevels: assignLevelToLoggers(['', 'example'], getLogLevelForEnv(isDev())) }).registerConsoleLogger()

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <div className={`${localStorage.getItem('theme') === 'colorful' ? 'colorful-theme' : ''} h-100`}>
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<FullPageSpinner useDefaults />}>
                    <HistoryRouter history={history}>
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
                    </HistoryRouter>
                </Suspense>
            </I18nextProvider>
        </div>
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
