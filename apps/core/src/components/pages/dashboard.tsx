import React from 'react'
import logo from '@/assets/logo.svg'
import BaseLink from '@/components/router/nav/base-link'
import styles from '@/components/pages/dashboard.module.css'
import Card from '@/components/ui/card/card'

const Dashboard = () => (
    <Card fillViewport={true}>
        <img
            src={logo}
            className={styles.logo}
            alt="logo"
            data-testid='dashboard-image' />
        <p>{'React Core!'}</p>
        <h5>{'Dashboard:'}</h5>
        <BaseLink
            to='about'
            text='About' />
        <BaseLink
            to='about/other'
            text='AboutOther' />
        <BaseLink
            to='about/12/Michał/37'
            text='About12' />
        <BaseLink
            to='about/child'
            text='AboutChild' />
        <BaseLink
            to='void'
            text='Void' />
        <h5>{'Dummy Module:'}</h5>
        <BaseLink
            to='dummy'
            text='Dummy' />
        <BaseLink
            to='dummy/about'
            text='Dummy About' />
        <BaseLink
            to='dummy/counter'
            text='Dummy Counter' />
        <BaseLink
            to='dummy/static'
            text='Dummy Static' />
        <h5>{'Map Module:'}</h5>
        <BaseLink
            to='map'
            text='Map' />
    </Card>
)

export default Dashboard
