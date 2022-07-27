import React, { Suspense } from 'react'
import App from '@/app'
import { createRoot } from 'react-dom/client'
import { logging, assignLevelToLoggers, getLogLevelForEnv } from '@ms7/logger'
import 'bootstrap/dist/css/bootstrap.min.css'
import { isDev } from '@ms7/common'
import { FullPageSpinner } from '@ms7/ui'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from '@ms7/router'
import '@fortawesome/fontawesome-svg-core'
import i18n from '@/i18n'
import { I18nextProvider } from 'react-i18next'
import '@/assets/styles/index.css'

logging.configure({ minLevels: assignLevelToLoggers(['', 'example'], getLogLevelForEnv(isDev())) }).registerConsoleLogger()

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<FullPageSpinner useDefaults />}>
                <HistoryRouter history={history}>
                    <App />
                </HistoryRouter>
            </Suspense>
        </I18nextProvider>
    </React.StrictMode>,
)
