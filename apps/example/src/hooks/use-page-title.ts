import { getFlatRoutes, getRoutes } from '@ms7/router'
import useRouterPageTitle, { PageTitleRoute } from '@ms7/page-title'
import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAppRouters } from '@/utils/app-utils'

const usePageTitle = () => {
    const { pathname } = useLocation()
    const [routes, setRoutes] = useState<PageTitleRoute[]>()

    useLayoutEffect(() => {
        setRoutes(getFlatRoutes(getRoutes(getAppRouters()), true).map(({ path, title }) => ({ path, title })))
    }, [pathname])
    
    return useRouterPageTitle(routes, { stringReturn: true })
}

export default usePageTitle