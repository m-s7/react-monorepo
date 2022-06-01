import React from 'react'
import styles from '@/components/layout/page-title.module.css'
import usePageTitle from '@/hooks/use-page-title'

const PageTitle = () => {
    const pageTitle = usePageTitle()

    return (<span className={styles.title}>{pageTitle?.title}</span>)
}

export default PageTitle