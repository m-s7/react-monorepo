import React, { useContext, useEffect } from 'react'
import { hasRoles } from './utils'
import { Role } from '@ms7/auth-providers'
import { AuthProviderContext } from '@ms7/auth-providers'
import { withAuth } from '@ms7/auth-providers'
import { useLocation, useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
    roles?: Role[],
    outlet?: boolean,
    forbidden: JSX.Element,
}

const ProtectedRoute = (props: React.PropsWithChildren<ProtectedRouteProps>) => {
    const navigate = useNavigate()
    const location = useLocation()
    const authContext = useContext(AuthProviderContext)

    const { roles, forbidden, children } = props

    useEffect(() => {
        if(authContext && !authContext.isAuthenticated())
            navigate('/login', { replace: true, state: { referrer: location.pathname }})
    }, [])

    if(!hasRoles(roles || [], authContext))
        return (forbidden)

    return (<>{children}</>)
}

export default withAuth(ProtectedRoute)
