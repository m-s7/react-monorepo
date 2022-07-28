import React from 'react'
import { Route as RouterRoute } from 'react-router-dom'
import ProtectedRoute from './protected-route'
import { Route } from './types'
import { Role } from '@ms7/auth'

interface ProtectedProps {
    layout: React.ElementType,
}

export const RouterGenerator = (routes: Route[], forbidden: JSX.Element, parentLayout?: React.ElementType): JSX.Element[] => routes.map(({ path, roles, component: Component, layout, children }, idx) => {
    const Layout = layout || parentLayout || React.Fragment

    const Unprotected = () => (
        <Layout>
            <Component />
        </Layout>
    )

    const Protected = (props: ProtectedProps) => (
        <ProtectedRoute
            roles={roles}
            forbidden={forbidden}
            layout={props.layout}>
            <Component />
        </ProtectedRoute>
    )

    if(children)
        return (
            <RouterRoute
                key={`idx-${path}-${idx}`}
                path={path}
                element={(roles?.find(role => role !== Role.GUEST) ? <Protected layout={React.Fragment} /> : <Component />)} >
                {RouterGenerator(children, forbidden, parentLayout)}
            </RouterRoute>
        )

    return (
        <RouterRoute
            key={`idx-${path}-${idx}`}
            path={path}
            element={(roles?.find(role => role !== Role.GUEST) ? <Protected layout={Layout} /> : <Unprotected />)} />
    )
})
