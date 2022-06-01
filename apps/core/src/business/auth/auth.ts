export interface Auth {
    init(): void,
    validate(): void,
    logout(): void,
    getToken(): string | undefined,
    hasRole(role: string): boolean,
    isAuthenticated(): boolean,
}