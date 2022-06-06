import React from 'react'
import BaseLink from '@/components/router/nav/base-link'
import { Card } from '@ms7/bui'

const Static = () => (
    <Card fillViewport={true}>
        <h2>{'Static!'}</h2>
        <h5>{'Dashboard:'}</h5>
        <BaseLink
            to='/'
            text='Dashboard' />
        <h5>{'Dummy App:'}</h5>
        <BaseLink
            to='/dummy/about'
            text='Dummy About' />
        <BaseLink
            to='/dummy/counter'
            text='Dummy Counter' />
    </Card>
)

export default Static