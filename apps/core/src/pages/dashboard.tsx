import React from 'react'
import DashboardComponent from '@/components/pages/dashboard'
import withAuth from '@/components/hoc/hoc-authenticate'

const Dashboard = () => (
    <DashboardComponent />
)

export default withAuth(Dashboard)
