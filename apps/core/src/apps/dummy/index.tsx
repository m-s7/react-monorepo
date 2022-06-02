import React from 'react'
import store from 'Dummy/store/store'
import { Provider } from 'react-redux'
import App from 'Dummy/app'

const Index = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default Index