import React from 'react'
import App from 'Guide/app'
import store from 'Guide/store/store'
import { env, isDev } from '@ms7/common'
import { getLogLevelForEnv, logging, LogLevel } from '@ms7/logger'
import { Provider } from 'react-redux'
import { FullPageFatalError } from '@ms7/bui'
import { ErrorBoundary } from 'react-error-boundary'
import { FullPageFatalErrorProps } from '@ms7/bui'

logging.addConfigurationOption({ minLevels: { 'websocket': getLogLevelForEnv(isDev()) }})

interface Props {
    parentLayout?: React.ElementType,
}

const FallbackError = (props: FullPageFatalErrorProps) => (
    <FullPageFatalError
        error={props.error}
        header={env.REACT_APP_NAME}
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