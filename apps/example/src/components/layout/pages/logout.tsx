import React, { useContext, useEffect, useState } from 'react'
import { AuthProviderContext } from '@ms7/auth'
import { FullPageSpinner, FullPageError } from '@ms7/ui'

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
        return (
            <FullPageError
                error={error}
                useDefaults />
        )
    
    return (<FullPageSpinner useDefaults />)
}

export default Logout
