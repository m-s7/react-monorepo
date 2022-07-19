import React, { useEffect } from 'react'
import { AuthProviderComponentProps } from '../auth-provider'
import { FirebaseOptions } from 'firebase/app'
import FirebaseAuth from './firebase-auth'

export interface FirebaseAuthProviderProps {
    options: FirebaseOptions,
    allowLogger?: boolean,
}

export const FirebaseAuthProvider = (props: AuthProviderComponentProps<FirebaseAuthProviderProps>) => {
    const { options, allowLogger } = props.providerProps

    useEffect(() => {
        const auth = new FirebaseAuth(options, allowLogger)

        auth.init()
        props.onLoad(auth)
    }, [])

    return (<>{props.children}</>)
}
