import React from 'react'
import App from '@/app'
import { f } from '@/tests/utils/assertions-utils'
import { MemoryRouter } from 'react-router-dom'
import { act, RenderResult } from '@testing-library/react'
import { renderWithProvider } from '@/tests/utils/wrapper-utils'
import ConfigManager from '@/business/config-manager'
import { getAppsConfigs } from '@/utils/apps-utils'

jest.mock('@/services/config-manager')
jest.mock('@/utils/apps-utils')

let wrapper: RenderResult
// let container: Element

beforeEach(async () => {
    f(ConfigManager).mockImplementation(() => ({
        loadConfig: () => new Promise(resolve => {
            resolve(true)
        }),
    }))
    f(getAppsConfigs).mockReturnValueOnce([])

    await act(async () => {
        wrapper = renderWithProvider(<App />, { wrapper: MemoryRouter })
        // container = wrapper.container
    })
})

describe('<App>', () => {
    describe('should renders', () => {
        it('without errors', async () => {
            wrapper.debug()
        })
    })
})
