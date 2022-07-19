import React, { useEffect, useState } from 'react'
import { AuthModel } from '@ms7/auth-providers'
import { FirebaseOptions } from 'firebase/app'
import FirebaseAuth, { FirebaseLoginCredentials } from '@/business/firebase/firebase-auth'

interface AuthProviderComponentProps extends React.PropsWithChildren {
    providerProps: unknown,
    onLoad: (authInstance: AuthModel) => void,
}

export interface FirebaseLoginComponentProps {
    onSubmit: (credentials: FirebaseLoginCredentials) => void,
    error?: Error,
}

export interface FirebaseAuthProviderProps {
    options: FirebaseOptions,
    loginComponent: React.ComponentType<FirebaseLoginComponentProps>,
    suspenseComponent: React.ComponentType,
    allowLogger?: boolean,
}

const FirebaseAuthProvider = (props: AuthProviderComponentProps) => {
    const { options, allowLogger, loginComponent, suspenseComponent } = (props.providerProps as FirebaseAuthProviderProps)

    const [firebaseAuth, setFirebaseAuth] = useState<FirebaseAuth>()
    const [error, setError] = useState<Error>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    useEffect(() => {
        const auth = new FirebaseAuth(options, allowLogger)

        auth.init()
        props.onLoad(auth)

        setFirebaseAuth(auth)
    }, [])

    if(isAuthenticating) {
        const SuspenseComponent = suspenseComponent
        return (<SuspenseComponent />)
    }

    if(!isAuthenticated) {
        const LoginComponent = loginComponent

        return (
            <LoginComponent
                error={error}
                onSubmit={credentials => {
                    setIsAuthenticating(true)

                    firebaseAuth?.login(credentials)
                        .then(isAuthenticated => {
                            setIsAuthenticated(isAuthenticated)
                        })
                        .catch(error => {
                            setError(error)
                        })
                        .finally(() => {
                            setIsAuthenticating(false)
                        })
                }} />
        )
    }

    return (<>{props.children}</>)
}

export default FirebaseAuthProvider