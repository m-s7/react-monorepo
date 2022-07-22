import React, { useContext, useEffect, useState } from 'react'
import { AuthProviderContext } from '@ms7/auth-providers'
import { FullPageSpinner, FullPageFatalError } from '@ms7/ui'
import { env } from '@ms7/common'

const Logout = () => {
    const authContext = useContext(AuthProviderContext)
    const [error, setError] = useState<Error>()

    useEffect(() => {
        if(authContext)
            authContext.logout()
                .then(() => { window.location.replace('/') })
                .catch(error => { setError(error)} )
        else
            window.location.replace('/')
    }, [])

    if(error)
        return (<FullPageFatalError error={error} />)
    
    return (
        <FullPageSpinner header={env.REACT_APP_NAME} />
    )
}

export default Logout
