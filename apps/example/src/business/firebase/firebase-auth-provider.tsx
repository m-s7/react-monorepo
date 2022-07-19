import React, { useEffect } from 'react'
import { AuthModel } from '@ms7/auth-providers'
import { FirebaseOptions } from 'firebase/app'
import FirebaseAuth, { FirebaseLoginCredentials } from '@/business/firebase/firebase-auth'

interface AuthProviderComponentProps extends React.PropsWithChildren {
    providerProps: unknown,
    onLoad: (authInstance: AuthModel) => void,
}

export interface FirebaseAuthProviderProps {
    options: FirebaseOptions,
    allowLogger?: boolean,
}

const FirebaseAuthProvider = (props: AuthProviderComponentProps) => {
    const { options, allowLogger } = (props.providerProps as FirebaseAuthProviderProps)

    useEffect(() => {
        const auth = new FirebaseAuth(options, allowLogger)

        auth.init()
        props.onLoad(auth)
    }, [])

    return (<>{props.children}</>)
}

export default FirebaseAuthProvider