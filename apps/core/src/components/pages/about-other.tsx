import React from 'react'
import BaseLink from '@/components/router/nav/base-link'
import { Card } from '@ms7/bui'

const AboutOther = () => (
    <Card fillViewport={true}>
        <h2>{'About Other'}</h2>
        <BaseLink
            to='/'
            text='Dashboard' />
    </Card>
)

export default AboutOther
