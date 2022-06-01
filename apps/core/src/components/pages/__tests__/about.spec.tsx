import React from 'react'
import About from '@/components/pages/about'
import { MemoryRouter } from 'react-router-dom'
import { screen, RenderResult } from '@testing-library/react'
import { renderWithProvider } from '@/tests/utils/wrapper-utils'

let wrapper: RenderResult
let container: Element
beforeEach(() => {
    wrapper = renderWithProvider(<About />, { wrapper: MemoryRouter })
    container = wrapper.container
})

describe('<About>', () => {
    describe('should renders', () => {
        it('correct text', () => {
            expect(screen.getByText('About')).toBeInTheDocument()
        })

        it('correct path', () => {
            expect(container.querySelector('[href="/"]')).toHaveTextContent('Dashboard')
        })
    })
})
