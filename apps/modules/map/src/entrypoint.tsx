import React from 'react'
import App from 'Map/app'
import store from 'Map/store/store'
import { Provider } from 'react-redux'
import { EntrypointComponentProps } from '@ms7/router'

const Entrypoint = (props: EntrypointComponentProps) => (
    <Provider store={store}>
        <App {...props} />
    </Provider>
)

export default Entrypoint