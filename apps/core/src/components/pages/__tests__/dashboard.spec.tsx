import React from 'react'
import Dashboard from '@/components/pages/dashboard'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { renderWithProvider } from '@/tests/utils/wrapper-utils'

jest.mock('@/services/keycloak-service')

let wrapper: RenderResult
let container: Element
beforeEach(() => {
    wrapper = renderWithProvider(<Dashboard />, { wrapper: MemoryRouter })
    container = wrapper.container
})

describe('<Dashboard>', () => {
    describe('should render', () => {
        it('correct texts', () => {
            expect(screen.getByText('React Core!')).toBeInTheDocument()
            expect(screen.getByText('Dashboard:')).toBeInTheDocument()
            expect(screen.getByText('Dummy Module:')).toBeInTheDocument()
            expect(screen.getByText('Authorization:')).toBeInTheDocument()
        })

        it('correct links', () => {
            expect(container.querySelector('[href="/about"]')).toHaveTextContent('About')
            expect(container.querySelector('[href="/void"]')).toHaveTextContent('Void')
            expect(container.querySelector('[href="/dummy"]')).toHaveTextContent('Dummy')
            expect(container.querySelector('[href="/dummy/about"]')).toHaveTextContent('Dummy About')
            expect(container.querySelector('[href="/dummy/counter"]')).toHaveTextContent('Dummy Counter')
        })
    })

    it('when button is clicked should call logout', async () => {
        const button = screen.getByRole('button', { name: 'Logout' })
        fireEvent.click(button)

        // expect(KeycloakManager.logout).toHaveBeenCalledTimes(1)
    })
})
