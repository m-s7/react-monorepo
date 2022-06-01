import React from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '@/store/store'

export const renderWithProvider = (children: React.ReactNode | React.ReactNode[], options: RenderOptions): RenderResult => render(
    <Provider store={store}>
        {children}
    </Provider>, options)