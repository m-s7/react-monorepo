import React, { useEffect, useState } from 'react'
import KeycloakAuth from '@/business/auth/keycloak-auth'
import { AuthProviderComponentProps } from '@/components/providers/auth-provider'
import CriticalError from '@/components/critical-error'
import FullPageLoader from '@/components/full-page-loader'
import { setupApiServiceInterceptors } from '@/business/api-service'

const KeycloakAuthProvider = (props: AuthProviderComponentProps) => {
    let keycloakAuth: KeycloakAuth
    const [error, setError] = useState<Error>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if(keycloakAuth) return

        keycloakAuth = new KeycloakAuth((isAuthenticated, error) : void => {
            setIsAuthenticated(isAuthenticated)
            setError(error)

            if(isAuthenticated) {
                const token = keycloakAuth.getToken()

                if(token)
                    setupApiServiceInterceptors(token, keycloakAuth.logout)
            }
        })

        keycloakAuth.init().then()
        props.onLoad(keycloakAuth)
    }, [])

    if(!isAuthenticated) {
        if(error) return (<CriticalError error={error} />)
        else return (<FullPageLoader />)
    }
    
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}
KeycloakAuthProvider.displayName = 'KeycloakAuthProvider'

export default KeycloakAuthProvider