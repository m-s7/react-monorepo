import React from 'react'
import App from 'Dummy/app'
import { logging, LogLevel } from '@ms7/logger'
import { Provider } from 'react-redux'
import store from 'Dummy/store/store'

logging.addConfigurationOption({ minLevels: { 'websocket': LogLevel.ERROR }})

interface Props {
    parentLayout?: React.ElementType,
}

const Entrypoint = (props: Props) => (
    <Provider store={store}>
        <App {...props} />
    </Provider>
)

export default Entrypoint