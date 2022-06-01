import React from 'react'
import styles from '@/layouts/layout-empty.module.css'

interface LayoutProps {
    children?: React.ReactNode | React.ReactNode[],
}

const LayoutEmpty = (props: LayoutProps) => {
    const { children } = props

    return (
        <div className={`${styles.column}`}>
            <div className={styles.row}>
                {children && <div>{children}</div>}
            </div>
        </div>
    )
}

export default LayoutEmpty