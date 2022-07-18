import React, { useContext } from 'react'
import { hasRoles } from './utils'
import { Role } from '@ms7/auth-providers'
import { AuthProviderContext } from '@ms7/auth-providers'
import { withAuth } from '@ms7/auth-providers'

interface ProtectedRouteProps {
    roles?: Role[],
    outlet?: boolean,
    forbidden: JSX.Element,
}

const ProtectedRoute = (props: React.PropsWithChildren<ProtectedRouteProps>) => {
    const { roles, forbidden, children } = props
    const authContext = useContext(AuthProviderContext)

    if(!hasRoles(roles || [], authContext))
        return (forbidden)

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default withAuth(ProtectedRoute)
