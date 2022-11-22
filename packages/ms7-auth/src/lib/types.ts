import React from 'react'

export interface AuthProviderComponentProps<T> extends React.PropsWithChildren {
    providerProps: T,
    onLoad: (authInstance: AuthModel) => void,
}

export interface LoginCredentials {
    email: string,
    password: string,
}

export interface AuthModel {
    init(): void,
    login(credentials?: LoginCredentials): Promise<boolean>,
    logout(): Promise<void>,
    validate(): void,
    getToken(): string | undefined,
    hasRole(role: string): boolean,
    isAuthenticated(): boolean,
    getUserInfo(): UserInfo,
    onAuthStateChanged(callback: AuthStateChangesCallback): void,
}

export interface UserInfo {
    username: string,
    name?: string,
    email?: string,
}

export type AuthStateChangesCallback = (isAuthenticated: boolean) => void
