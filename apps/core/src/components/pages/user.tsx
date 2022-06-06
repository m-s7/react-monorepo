import React from 'react'
import BaseLink from '@/components/router/nav/base-link'
import { Card } from '@ms7/bui'
import { Outlet } from 'react-router-dom'

const User = () => (
    <Card fillViewport={true}>
        <h2>{'User'}</h2>
        <BaseLink
            to='/'
            text='Dashboard' />
        <Outlet />
    </Card>
)

export default User
