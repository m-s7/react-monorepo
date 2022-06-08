import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouterGenerator } from '@ms7/router'
import { NotFound404 } from '@ms7/bui'
import { getRoutes } from '@ms7/router'
import { getAppsEntrypointsConfigs } from '@/utils/apps-utils'
import Layout from '@/layouts/layout'
import { getAppRouters } from '@/utils/app-utils'

const AppRouter = () => {
    const routes = getRoutes(getAppRouters())
    const entrypoints = getAppsEntrypointsConfigs()

    const Component404 = (
        <NotFound404
            to={'/'}
            header={'404 - Not Found'}>
            {'Dashboard'}
        </NotFound404> )
    
    return (
        <Routes>
            {RouterGenerator(routes, Component404, Layout)}
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
                element={Component404} />
        </Routes>
    )
}

export default AppRouter