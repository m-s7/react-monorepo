import React from 'react'
import Entrypoint from 'Map/entrypoint'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'Map/global.css'
import styled from 'styled-components'
import { history } from '@ms7/router'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

const Container = styled.div`
    background-color: #454d55;
`

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
            <Container className="p-1">
                <Entrypoint />
            </Container>
        </HistoryRouter>
    </React.StrictMode>,
)
