import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppRouterGenerator from '@/components/generators/app-router-generator'
import NotFound from '@/pages/not-found'
import { getRoutes } from '@/utils/router-utils'
import { getAppsEntrypointsConfigs } from '@/utils/apps-utils'
import Layout from '@/layouts/layout'

const AppRouter = () => {
    const routes = getRoutes()
    const entrypoints = getAppsEntrypointsConfigs()

    return (
        <Routes>
            {AppRouterGenerator(routes, Layout)}
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