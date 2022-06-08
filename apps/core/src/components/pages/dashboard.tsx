import React from 'react'
import logo from '@/assets/logo.svg'
import styles from '@/components/pages/dashboard.module.css'
import { Card, RouterLink } from '@ms7/bui'

const Dashboard = () => (
    <Card fillViewport={true}>
        <h1>{'React Core!'}</h1>
        <img
            src={logo}
            className={styles.logo}
            alt="logo"
            data-testid='dashboard-image' />
    </Card>
)

export default Dashboard
