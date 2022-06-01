import React from 'react'
import PageTitle from '@/components/layout/page-title'
import Breadcrumbs from '@/components/layout/breadcrumbs'
import styles from '@/components/layout/header.module.css'

const Header = () => (
    <div className={styles.container}>
        <PageTitle />
        <Breadcrumbs />
    </div>
)

export default Header