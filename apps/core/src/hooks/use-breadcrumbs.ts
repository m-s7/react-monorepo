import { getFlatRoutes, getRoutes } from '@/utils/router-utils'
import useRouterBreadcrumbs, { BreadcrumbRoute } from '@ms7/breadcrumbs'
import { useLocation } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

const useBreadcrumbs = () => {
    const { pathname } = useLocation()
    const [routes, setRoutes] = useState<BreadcrumbRoute[]>()

    useLayoutEffect(() => {
        setRoutes(getFlatRoutes(getRoutes(), true).map(({ path, breadcrumb }) => ({ path, breadcrumb })))
    }, [pathname])

    return useRouterBreadcrumbs(routes, { disableDefaults: true, stringReturn: true, overrideDefaultHome: 'Dashboard' })
}

export default useBreadcrumbs