import React from 'react'
import App from '@/app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { logging, assignLevelToLoggers, getLogLevelForEnv } from '@ms7/logger'
import { loadFaIcons } from '@/utils/fa-utils'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/global.css'
import { isDev } from '@ms7/common'
import './i18n'

loadFaIcons()
logging.configure({ minLevels: assignLevelToLoggers(['', 'core'], getLogLevelForEnv(isDev())) }).registerConsoleLogger()

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
