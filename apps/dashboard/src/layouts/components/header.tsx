import React from 'react'
import PageTitle from '@/layouts/components/header/page-title'
import Breadcrumbs from '@/layouts/components/header/breadcrumbs'

const Header = () => (
    <div className="d-flex align-items-center justify-content-between mt-2 mb-2 ms-4 me-4">
        <PageTitle />
        <Breadcrumbs />
    </div>
)

export default Header