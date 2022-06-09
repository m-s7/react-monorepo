import React from 'react'
import usePageTitle from '@/hooks/use-page-title'
import styled from 'styled-components'

const Title = styled.span`
    font-size: 22px;
`

const PageTitle = () => {
    const pageTitle = usePageTitle()

    return (<Title>{pageTitle?.title}</Title>)
}

export default PageTitle