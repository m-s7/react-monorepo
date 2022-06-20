import React from 'react'
import App from 'Guide/app'
import env from 'Guide/env'
import store from 'Guide/store/store'
import { logging, LogLevel } from '@ms7/logger'
import { Provider } from 'react-redux'
import { FullPageFatalError } from '@ms7/bui'
import { ErrorBoundary } from 'react-error-boundary'
import { FullPageFatalErrorProps } from '@ms7/bui'

logging.addConfigurationOption({ minLevels: { 'websocket': LogLevel.ERROR }})

interface Props {
    parentLayout?: React.ElementType,
}

const FallbackError = (props: FullPageFatalErrorProps) => (
    <FullPageFatalError
        error={props.error}
        home_link_name={env.REACT_APP_HOMEPAGE_NAME} />
)

const Entrypoint = (props: Props) => (
    <ErrorBoundary FallbackComponent={FallbackError} >
        <Provider store={store}>
            <App {...props} />
        </Provider>
    </ErrorBoundary>
)

export default Entrypoint