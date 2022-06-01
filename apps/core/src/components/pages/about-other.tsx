import React from 'react'
import Layout from '@/layouts/layout'
import BaseLink from '@/components/router/nav/base-link'
import Card from '@/components/ui/card/card'

const AboutOther = () => (
    <Layout>
        <Card fillViewport={true}>
            <h2>{'About Other'}</h2>
            <BaseLink
                to='/'
                text='Dashboard' />
        </Card>
    </Layout>
)

export default AboutOther
