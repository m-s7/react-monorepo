import { getFlatRoutes, getRoutes } from '@/utils/router-utils'
import useRouterPageTitle, { PageTitleRoute } from '@/lib/page-title'
import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const usePageTitle = () => {
    const { pathname } = useLocation()
    const [routes, setRoutes] = useState<PageTitleRoute[]>()

    useLayoutEffect(() => {
        setRoutes(getFlatRoutes(getRoutes(), true).map(({ path, title }) => ({ path, title })))
    }, [pathname])
    
    return useRouterPageTitle(routes, { stringReturn: true })
}

export default usePageTitle