import React, { useContext } from 'react'
import NotFound from '@/pages/not-found'
import { hasRoles } from '@/utils/app-utils'
import { Role } from '@/constants/role'
import { AuthProviderContext } from '@/components/providers/auth-provider'

interface Props {
    roles?: Role[],
    outlet?: boolean,
    children: React.ReactNode | React.ReactNode[],
}

const ProtectedRoute = (props: Props) => {
    const { roles, children } = props
    const authContext = useContext(AuthProviderContext)

    if(!hasRoles(roles || [], authContext))
        return (<NotFound />)

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default ProtectedRoute
