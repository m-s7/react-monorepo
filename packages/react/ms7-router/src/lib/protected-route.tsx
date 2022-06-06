import React, { useContext } from 'react'
import { hasRoles } from './utils'
import { Role } from '@ms7/auth-providers'
import { AuthProviderContext } from '@ms7/auth-providers'

interface Props {
    roles?: Role[],
    outlet?: boolean,
    component404: React.ElementType,
    children: React.ReactNode | React.ReactNode[],
}

const ProtectedRoute = (props: Props) => {
    const { roles, component404, children } = props
    const authContext = useContext(AuthProviderContext)

    if(!hasRoles(roles || [], authContext)) {
        const Component404 = component404

        return (<Component404 />)
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default ProtectedRoute
