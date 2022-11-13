import React from 'react'
import Entrypoint from 'Core/entrypoint'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { isDev } from '@ms7/common'
import { Card, Link } from '@ms7/ui'
import { assignLevelToLoggers, getLogLevelForEnv, logging } from '@ms7/logger'
logging.configure({ minLevels: assignLevelToLoggers([''], getLogLevelForEnv(isDev())) }).registerConsoleLogger()
import 'Core/assets/styles/standalone.css'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="p-1">
                <Card className="d-flex flex-column mb-1 align-items-center">
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item"><Link to="/rest-rq">Rest RQ</Link></li>
                        <li className="list-group-item "><Link to="/graph-ql">Graph QL</Link></li>
                        <li className="list-group-item"><Link to="/memo">Memo</Link></li>
                        <li className="list-group-item"><Link to="/modal">Modal</Link></li>
                        <li className="list-group-item"><Link to="/redux">Redux</Link></li>
                        <li className="list-group-item"><Link to="/callback">Callback</Link></li>
                        <li className="list-group-item"><Link to="/event-bus">Event Bus</Link></li>
                        <li className="list-group-item"><Link to="/rxjs-subject">RxJsSubject</Link></li>
                        <li className="list-group-item"><Link to="/lazy-suspense">LazySuspense</Link></li>
                    </ul>
                </Card>
                <Entrypoint />
            </div>
        </BrowserRouter>
    </React.StrictMode>,
)
