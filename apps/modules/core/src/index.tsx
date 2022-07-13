import React from 'react'
import Entrypoint from 'Core/entrypoint'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'Core/global.css'
import styled from 'styled-components'
import { AuthProvider, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'
import { env } from '@ms7/common'
import { Card, FullPageError, FullPageLoader } from '@ms7/bui'
import { Link } from 'react-router-dom'

const Container = styled.div`
    background-color: #454d55;
`

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/*<AuthProvider<KeycloakAuthProviderProps>*/}
            {/*    provider={KeycloakAuthProvider}*/}
            {/*    providerProps={{*/}
            {/*        config: { url: env.REACT_APP_KEYCLOAK_URL, realm: env.REACT_APP_KEYCLOAK_REALM, clientId: env.REACT_APP_KEYCLOAK_CLIENTID },*/}
            {/*        errorComponent: (props: { error: Error }) => (*/}
            {/*            <FullPageError*/}
            {/*                error={props.error}*/}
            {/*                header={env.REACT_APP_NAME} />),*/}
            {/*        suspenseComponent: () => (<FullPageLoader header={env.REACT_APP_NAME} />),*/}
            {/*    }}>*/}
            <Container className="p-1">
                <Card className="d-flex flex-column mb-1">
                        Menu
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item"><Link to={'/rest-rq'}>Rest RQ</Link></li>
                        <li className="list-group-item"><Link to={'/redux'}>Redux</Link></li>
                        <li className="list-group-item"><Link to={'/graph-ql'}>Graph QL</Link></li>
                        <li className="list-group-item"><Link to={'/event-bus'}>Event Bus</Link></li>
                        <li className="list-group-item"><Link to={'/rxjs-subject'}>RxJsSubject</Link></li>
                        <li className="list-group-item"><Link to={'/lazy-suspense'}>LazySuspense</Link></li>
                    </ul>
                </Card>
                <Entrypoint />
            </Container>
            {/*</AuthProvider>*/}
        </BrowserRouter>
    </React.StrictMode>,
)
