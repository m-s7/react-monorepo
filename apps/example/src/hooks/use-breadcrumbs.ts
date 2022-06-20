import { getFlatRoutes, getRoutes } from '@ms7/router'
import useRouterBreadcrumbs, { BreadcrumbRoute } from '@ms7/breadcrumbs'
import { useLocation } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { getAppRouters } from '@/utils/app-utils'

const useBreadcrumbs = () => {
    const { pathname } = useLocation()
    const [routes, setRoutes] = useState<BreadcrumbRoute[]>()

    useLayoutEffect(() => {
        setRoutes(getFlatRoutes(getRoutes(getAppRouters()), true).map(({ path, breadcrumb }) => ({ path, breadcrumb })))
    }, [pathname])

    return useRouterBreadcrumbs(routes, { disableDefaults: true, stringReturn: true, overrideDefaultHome: 'Home' })
}

export default useBreadcrumbs