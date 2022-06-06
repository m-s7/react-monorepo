import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouterGenerator } from '@ms7/router'
import NotFound from '@/pages/not-found'
import { getRoutes } from '@ms7/router'
import { getAppsEntrypointsConfigs } from '@/utils/apps-utils'
import Layout from '@/layouts/layout'
import { getAppRouters } from '@/utils/app-utils'

const AppRouter = () => {
    const routes = getRoutes(getAppRouters())
    const entrypoints = getAppsEntrypointsConfigs()

    return (
        <Routes>
            {RouterGenerator(routes, NotFound, Layout)}
            {entrypoints.map(({ baseUrl, component }, index) => {
                const Component = component
                return (
                    <Route
                        key={`app-entrypoint-${index}`}
                        path={baseUrl}
                        element={<Component parentLayout={Layout} />} />
                )
            })}
            <Route
                path={'*'}
                element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter