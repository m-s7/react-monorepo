import React from 'react'
import usePageTitle from '@/hooks/use-page-title'

const PageTitle = () => {
    const pageTitle = usePageTitle()

    return (<span className="font-size-largest">{pageTitle?.title}</span>)
}

export default PageTitle