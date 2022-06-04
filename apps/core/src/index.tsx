import React from 'react'
import store, { RootState } from '@/store/store'
import App from '@/app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { logging, assignLevelToLoggers, getLogLevelForEnv } from '@ms7/logger'
import { loadFaIcons } from '@/utils/fa-utils'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/global.css'
import { ReactReduxContextValue } from 'react-redux/src/components/Context'
import { isDev } from '@/utils/app-utils'

loadFaIcons()
logging.configure({ minLevels: assignLevelToLoggers(['', 'core'], getLogLevelForEnv(isDev())) }).registerConsoleLogger()

export const CoreStoreContext = React.createContext<ReactReduxContextValue<RootState>>({} as any)

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider
                context={CoreStoreContext}
                store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)

// if(isDev() && module.hot) module.hot.accept()