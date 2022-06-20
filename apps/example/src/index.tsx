import React from 'react'
import { RootState } from '@/store/store'
import App from '@/app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactReduxContextValue } from 'react-redux'
import { logging, assignLevelToLoggers, getLogLevelForEnv } from '@ms7/logger'
import { loadFaIcons } from '@/utils/fa-utils'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/global.css'
import { isDev } from '@ms7/common'

loadFaIcons()
logging.configure({ minLevels: assignLevelToLoggers(['', 'core'], getLogLevelForEnv(isDev())) }).registerConsoleLogger()

export const CoreStoreContext = React.createContext<ReactReduxContextValue<RootState>>({} as any)

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)

// if(isDev() && module.hot) module.hot.accept()