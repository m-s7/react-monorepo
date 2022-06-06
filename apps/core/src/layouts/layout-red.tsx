import React from 'react'
import styles from '@/layouts/layout.module.css'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'

interface LayoutProps {
    children?: React.ReactNode | React.ReactNode[],
}

const LayoutRed = (props: LayoutProps) => {
    const { children } = props

    return (
        <div className={styles.columnRed}>
            <div className={styles.left}>
                <Sidebar />
            </div>
            <div className={`${styles.right} ${styles.box}`}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.container}>
                        {children && <div className="h-100">{children}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutRed