import React, { ElementType } from 'react'
import { RouteConfig } from '@/business/models/router'
import { Route } from 'react-router-dom'
import ProtectedRoute from '@/components/router/protected-route'

const AppRouterGenerator = (routes: RouteConfig[], parentLayout?: ElementType): JSX.Element[] => routes.map(({ path, index, roles, component, layout, children }, idx) => {
    const Layout = layout || parentLayout || React.Fragment
    const Component = component
    const Protected = (
        <ProtectedRoute roles={roles}>
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
                {AppRouterGenerator(children)}
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

export default AppRouterGenerator
