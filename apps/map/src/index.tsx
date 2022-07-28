import React from 'react'
import Entrypoint from 'Map/entrypoint'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { history } from '@ms7/router'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import 'Map/assets/styles/standalone.css'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
            <div className="p-1">
                <Entrypoint />
            </div>
        </HistoryRouter>
    </React.StrictMode>,
)
