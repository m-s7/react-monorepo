import React, { ElementType } from 'react'
import { Route } from 'react-router-dom'
import { RouteConfig } from './types'
import ProtectedRoute from './protected-route'

export const RouterGenerator = (routes: RouteConfig[], component404: ElementType, parentLayout?: ElementType): JSX.Element[] => routes.map(({ path, index, roles, component, layout, children }, idx) => {
    const Layout = layout || parentLayout || React.Fragment
    const Component = component
    const Component404 = component404
    const Protected = (
        <ProtectedRoute
            roles={roles}
            component404={component404}>
            <Layout>
                <Component />
            </Layout>
        </ProtectedRoute>
    )

    if(children) {
        return (
            <Route
                key={`idx-${path}-${idx}`}
                path={path}
                element={
                    <Layout>
                        <Component />
                    </Layout>
                }>
                {RouterGenerator(children, component404)}
            </Route>
        )
    }
    else {
        if(index)
            return (
                <Route
                    key={`idx-${path}-${idx}`}
                    index
                    element={Protected} />
            )
        else
            return (
                <Route
                    key={`idx-${path}-${idx}`}
                    path={path}
                    element={Protected} />
            )
    }
})
