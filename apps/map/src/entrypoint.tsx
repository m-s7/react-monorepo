import React from 'react'
import App from 'Map/app'
import store from 'Map/store/store'
import { Provider } from 'react-redux'
import { EntrypointComponentProps } from '@ms7/router'
import i18n from 'Map/i18n'
import { I18nextProvider } from 'react-i18next'
import 'Map/assets/styles/index.css'

const Entrypoint = (props: EntrypointComponentProps) => (
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <App {...props} />
        </Provider>
    </I18nextProvider>
)

export default Entrypoint