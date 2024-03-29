import React from 'react'
import App from 'Core/app'
import store from 'Core/store/store'
import { isDev } from '@ms7/common'
import { getLogLevelForEnv, logging } from '@ms7/logger'
import { Provider } from 'react-redux'
import { FullPageError } from '@ms7/ui'
import { ErrorBoundary } from 'react-error-boundary'
import { EntrypointComponentProps } from '@ms7/router'
import i18n from 'Core/i18n'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'Core/assets/styles/index.css'

logging.addConfigurationOption({ minLevels: { 'websocket': getLogLevelForEnv(isDev()) }})

const ErrorFallback = (props: { error: Error }) => (
    <FullPageError
        error={props.error}
        useDefaults />
)

const Entrypoint = (props: EntrypointComponentProps) => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={new QueryClient()}>
                <Provider store={store}>
                    <App {...props} />
                </Provider>
            </QueryClientProvider>
        </I18nextProvider>
    </ErrorBoundary>
)

export default Entrypoint