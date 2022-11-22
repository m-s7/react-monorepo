import * as React from 'react'
import { NotFound404 } from '../404-not-found'
import { MemoryRouter } from 'react-router-dom'
import { cleanup,  render, RenderResult } from '@testing-library/react'

afterEach(cleanup)

describe('<NotFound>', () => {
    it('should render correct data', () => {
        const component: RenderResult = render(
            <MemoryRouter>
                <NotFound404
                    to="test-link"
                    header="Test header - 123">
                    {'Test Text'}
                </NotFound404>
            </MemoryRouter>)

        expect(component.queryByText('Test header - 123')).toBeTruthy()
        expect(component.container.querySelector('[href="/test-link"]')).toHaveTextContent('Test Text')
    })
})
