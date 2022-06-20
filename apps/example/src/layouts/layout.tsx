import React from 'react'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import Header from '@/components/layout/header'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #454d55;
`

const ContainerLeft = styled.div`
    width: 250px;
    min-width: 250px;
`

const ContainerRight = styled.div`
    flex-flow: column;
`

const Layout = (props: React.PropsWithChildren<void>) => {
    const { children } = props

    return (
        <Container className="d-flex h-100">
            <ContainerLeft>
                <Sidebar />
            </ContainerLeft>
            <ContainerRight className="d-flex flex-grow-1">
                <Navbar />
                <Header />
                <div className="p-1 h-100">
                    {children && children}
                </div>
            </ContainerRight>
        </Container>
    )
}

export default Layout