import React from 'react'
import { Card } from '@ms7/bui'
import { Outlet } from 'react-router-dom'

const Index = () => (
    <Card fillViewport={true}>
        <p>This is a parent component, child is rendered using &lt;Outlet&gt; component.</p>
        <p>Child re-render does not affect this component state.</p>
        <hr />
        <Outlet />
    </Card>
)

export default Index