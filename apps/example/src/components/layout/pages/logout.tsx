import React, { useContext, useEffect } from 'react'
import { AuthProviderContext } from '@ms7/auth-providers'
import { FullPageLoader } from '@ms7/ui'
import { env } from '@ms7/common'

const Logout = () => {
    const authContext = useContext(AuthProviderContext)

    useEffect(() => {
        if(authContext) authContext.logout().then(() => { window.location.replace('/') })
        else window.location.replace('/')
    }, [])
    
    return (
        <FullPageLoader header={env.REACT_APP_NAME} />
    )
}

export default Logout
