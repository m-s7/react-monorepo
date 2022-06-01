import React from 'react'
import NotFound from '@/components/pages/not-found'
import { MemoryRouter } from 'react-router-dom'
import { screen, RenderResult } from '@testing-library/react'
import { renderWithProvider } from '@/tests/utils/wrapper-utils'

let wrapper: RenderResult
let container: Element
beforeEach(() => {
    wrapper = renderWithProvider(<NotFound />, { wrapper: MemoryRouter })
    container = wrapper.container
})

describe('<NotFound>', () => {
    describe('should render', () => {
        it('correct text', () => {
            expect(screen.getByText('404 - Not Found')).toBeInTheDocument()
        })

        it('correct path', () => {
            expect(container.querySelector('[href="/"]')).toHaveTextContent('Dashboard')
        })
    })
})
