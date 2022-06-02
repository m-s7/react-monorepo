import React from 'react'
import NotFound from '@/components/pages/not-found'
import { MemoryRouter } from 'react-router-dom'
import { cleanup,  render, RenderResult } from '@testing-library/react'

afterEach(cleanup)

describe('<NotFound>', () => {
    it('should render correct data', () => {
        const component: RenderResult = render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>)

        expect(component.queryByText('404 - Not Found')).toBeTruthy()
        expect(component.container.querySelector('[href="/"]')).toHaveTextContent('Dashboard')
    })
})
