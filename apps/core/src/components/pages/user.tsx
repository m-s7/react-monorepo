import React from 'react'
import Layout from '@/layouts/layout'
import BaseLink from '@/components/router/nav/base-link'
import Card from '@/components/ui/card/card'
import { Outlet } from 'react-router-dom'

const User = () => (
    <Layout>
        <Card fillViewport={true}>
            <h2>{'User'}</h2>
            <BaseLink
                to='/'
                text='Dashboard' />
            <Outlet />
        </Card>
    </Layout>
)

export default User
