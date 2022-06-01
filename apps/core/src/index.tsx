import React from 'react'
import store from '@/store/store'
import App from '@/app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { logging } from '@/business/log-manager'
import { assignLevelToLoggers, getLogLevelForEnv } from '@/utils/logger-utils'
import { loadFaIcons } from '@/utils/fa-utils'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/global.css'

loadFaIcons()
logging.configure({ minLevels: assignLevelToLoggers(['', 'core', 'keycloak', 'api', 'websocket'], getLogLevelForEnv()) }).registerConsoleLogger()

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)

// if(isDev() && module.hot) module.hot.accept()