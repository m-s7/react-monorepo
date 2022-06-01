import React from 'react'
import styles from '@/components/full-page-loader.module.css'
import BaseLink from '@/components/router/nav/base-link'
import { useLocation } from 'react-router-dom'
import { getRoutePathname } from '@/utils/router-utils'
import LayoutEmpty from '@/layouts/layout-empty'
import CardCenterSmall from '@/components/ui/card/card-center-small'

const FullPageLoader = () => {
    const location = useLocation()
    const isLocationDashboard = getRoutePathname(location.pathname) === ''

    return (
        <LayoutEmpty>
            <CardCenterSmall>
                <div className={`${styles.loader}`} />
                <span className={styles.info}>{'Please wait...'}</span>
                {!isLocationDashboard &&
                    <BaseLink
                        to='/'
                        text='Dashboard' />
                }
            </CardCenterSmall>
        </LayoutEmpty>
    )
}

export default FullPageLoader
