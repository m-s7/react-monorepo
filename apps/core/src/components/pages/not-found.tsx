import React from 'react'
import BaseLink from '@/components/router/nav/base-link'
import LayoutEmpty from '@/layouts/layout-empty'
import { CardSmallCentered } from '@ms7/bui'

const NotFound = () => (
    <LayoutEmpty>
        <CardSmallCentered>
            <h2>{'404 - Not Found'}</h2>
            <BaseLink
                to='/'
                text='Dashboard' />
        </CardSmallCentered>
    </LayoutEmpty>
)

export default NotFound