import React from 'react'
import { Card } from '@ms7/bui'
import { Outlet } from 'react-router-dom'

const User = () => (
    <Card fillViewport={true}>
        <h1>{'User'}</h1>
        <Outlet />
    </Card>
)

export default User
