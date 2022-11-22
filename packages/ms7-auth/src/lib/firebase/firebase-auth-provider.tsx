import React, { useEffect } from 'react'
import { AuthProviderComponentProps } from '../types'
import { FirebaseOptions } from 'firebase/app'
import FirebaseAuth from './firebase-auth'

export interface FirebaseAuthProviderProps {
    options: FirebaseOptions,
}

export const FirebaseAuthProvider = (props: AuthProviderComponentProps<FirebaseAuthProviderProps>) => {
    const { options } = props.providerProps

    useEffect(() => {
        const auth = new FirebaseAuth(options)

        auth.init()
        props.onLoad(auth)
    }, [])

    return (<>{props.children}</>)
}
