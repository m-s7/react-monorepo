import React, { useContext } from 'react'
import { hasRoles } from './utils'
import { Role } from '@ms7/auth-providers'
import { AuthProviderContext } from '@ms7/auth-providers'
import { withAuth } from '@ms7/auth-providers'

interface ProtectedRouteProps {
    roles?: Role[],
    outlet?: boolean,
    component404: JSX.Element,
}

const ProtectedRoute = (props: React.PropsWithChildren<ProtectedRouteProps>) => {
    const { roles, component404, children } = props
    const authContext = useContext(AuthProviderContext)

    if(!hasRoles(roles || [], authContext))
        return (component404)

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default withAuth(ProtectedRoute)