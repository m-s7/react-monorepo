import React from 'react'
import store from 'Dummy/store/store'
import { Provider } from 'react-redux'
import App from 'Dummy/app'
import { logging, LogLevel } from '@ms7/logger'

logging.addConfigurationOption({ minLevels: { 'websocket': LogLevel.ERROR }})

interface Props {
    parentLayout?: React.ElementType,
}

const Index = (props: Props) => (
    <Provider store={store}>
        <App {...props} />
    </Provider>
)

export default Index