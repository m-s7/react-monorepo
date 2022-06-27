import React from 'react'
import Entrypoint from 'Map/entrypoint'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'Map/global.css'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #454d55;
`

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Container className="p-1">
                <Entrypoint />
            </Container>
        </BrowserRouter>
    </React.StrictMode>,
)
