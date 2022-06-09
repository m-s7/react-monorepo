import React from 'react'
import PageTitle from '@/components/layout/page-title'
import Breadcrumbs from '@/components/layout/breadcrumbs'
import styled from 'styled-components'

const Container = styled.div`
    margin: 10px 25px;
`

const Header = () => (
    <Container className="d-flex align-items-center justify-content-between">
        <PageTitle />
        <Breadcrumbs />
    </Container>
)

export default Header