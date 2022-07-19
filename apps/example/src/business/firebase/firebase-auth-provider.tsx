import React, { useEffect, useState } from 'react'
// import KeycloakAuth, { KeycloakConfig } from './keycloak-auth'
import { AuthModel } from '@ms7/auth-providers'
import firebase, { FirebaseApp, FirebaseOptions } from 'firebase/app'
import FirebaseAuth from '@/business/firebase/firebase-auth'

type FirebaseErrorComponentType = React.ComponentType<{ error: Error }>
type FirebaseSuspenseComponentType = React.ComponentType

interface AuthProviderComponentProps extends React.PropsWithChildren {
    providerProps: unknown,
    onLoad: (authInstance: AuthModel) => void,
}

export interface FirebaseAuthProviderProps {
    options: FirebaseOptions,
    errorComponent: FirebaseErrorComponentType,
    suspenseComponent: FirebaseSuspenseComponentType,
    onAuthenticatedHandler?: (token: string | undefined, logoutMethod: () => void) => void,
    allowLogger?: boolean,
}

const FirebaseAuthProvider = (props: AuthProviderComponentProps) => {
    const { options, errorComponent, suspenseComponent, onAuthenticatedHandler, allowLogger } = (props.providerProps as FirebaseAuthProviderProps)

    let firebaseAuth: FirebaseAuth
    const [error, setError] = useState<Error>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if(firebaseAuth) return
        firebaseAuth = new FirebaseAuth(options, (isAuthenticated, error) : void => {
            setIsAuthenticated(isAuthenticated)
            setError(error)

            if(isAuthenticated && onAuthenticatedHandler)
                onAuthenticatedHandler(firebaseAuth.getToken(), firebaseAuth.getLogoutUrl)
        }, allowLogger)

        firebaseAuth.init({ email: 'aaa', password: 'bbb' })
        props.onLoad(firebaseAuth)
    }, [])

    if(!isAuthenticated) {
        const ErrorComponent = errorComponent
        const SuspenseComponent = suspenseComponent

        if(error) return (<ErrorComponent error={error} />)
        else return (<SuspenseComponent />)
    }

    return (<>{props.children}</>)
}

export default FirebaseAuthProvider