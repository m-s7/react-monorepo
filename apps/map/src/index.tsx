import React from 'react'
import Entrypoint from 'Map/entrypoint'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import 'Map/assets/styles/standalone.css'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="p-1">
                <Entrypoint />
            </div>
        </BrowserRouter>
    </React.StrictMode>,
)
