import React from 'react'
import BaseLink from '@/components/router/nav/base-link'
import LayoutEmpty from '@/layouts/layout-empty'
import CardCenterSmall from '@/components/ui/card/card-center-small'

const NotFound = () => (
    <LayoutEmpty>
        <CardCenterSmall>
            <h2>{'404 - Not Found'}</h2>
            <BaseLink
                to='/'
                text='Dashboard' />
        </CardCenterSmall>
    </LayoutEmpty>
)

export default NotFound