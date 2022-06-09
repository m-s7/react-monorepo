import React from 'react'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import Header from '@/components/layout/header'
import store from '@/store/store'
import { CoreStoreContext } from '@/index'
import { Provider } from 'react-redux'
import styled from 'styled-components'

interface LayoutProps {
    children?: React.ReactNode | React.ReactNode[],
}
const Container = styled.div`
    background-color: #d47286;
`

const ContainerLeft = styled.div`
    width: 250px;
`

const ContainerRight = styled.div`
    flex-flow: column;
`

const Layout = (props: LayoutProps) => {
    const { children } = props

    return (
        <Container className="d-flex h-100">
            <ContainerLeft>
                <Sidebar />
            </ContainerLeft>
            <ContainerRight className="d-flex flex-grow-1">
                <Provider
                    context={CoreStoreContext}
                    store={store}>
                    <Navbar />
                </Provider>
                <Header />
                <div className="h-100">
                    <div className="p-1 h-100">
                        {children && <div className="h-100">{children}</div>}
                    </div>
                </div>
            </ContainerRight>
        </Container>
    )
}

export default Layout