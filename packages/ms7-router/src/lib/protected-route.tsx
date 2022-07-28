import React, { useContext } from 'react'
import { hasRoles } from './utils'
import { Role, AuthProviderContext, withAuth } from '@ms7/auth'

interface ProtectedRouteProps {
    roles?: Role[],
    outlet?: boolean,
    forbidden: JSX.Element,
    layout: React.ElementType,
}

const ProtectedRoute = (props: React.PropsWithChildren<ProtectedRouteProps>) => {
    const authContext = useContext(AuthProviderContext)

    const { roles, forbidden, children, layout: Layout } = props

    if(!hasRoles(roles || [], authContext))
        return (forbidden)

    return (<Layout>{children}</Layout>)
}

export default withAuth(ProtectedRoute)
