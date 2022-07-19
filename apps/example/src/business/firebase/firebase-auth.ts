import { AuthModel, UserInfo } from '@ms7/auth-providers'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, UserCredential, AuthError, signOut } from 'firebase/auth'

export interface FirebaseLoginCredentials {
    email: string,
    password: string,
}

class FirebaseAuth implements AuthModel {
    private readonly options: FirebaseOptions
    private readonly allowLogger: boolean

    private firebase: FirebaseApp | undefined = undefined
    private _token: string | undefined
    private _isAuthenticated = false
    private _userCredential: UserCredential | undefined

    constructor(options: FirebaseOptions, allowLogger = true) {
        this.options = options
        this.allowLogger = allowLogger
    }

    public init(): void {
        this.firebase = initializeApp(this.options)
    }

    public async login(credentials: FirebaseLoginCredentials): Promise<boolean> {
        const { email, password } = credentials

        return await signInWithEmailAndPassword(getAuth(this.firebase), email, password)
            .then((userCredential: UserCredential) => {
                this._token = userCredential.user.refreshToken
                this._isAuthenticated = true
                this._userCredential = userCredential

                return true
            })
            .catch((authError: AuthError) => {
                // simplify messages to allow simple translations
                let message = authError.message
                if(message.includes('auth/user-not-found')) message = 'user-not-found'
                if(message.includes('auth/wrong-password')) message = 'user-not-found'
                if(message.includes('auth/invalid-email')) message = 'user-not-found'
                if(message.includes('auth/internal-error')) message = 'user-not-found'

                throw new Error(message)
            })
    }

    public logout(): Promise<void> {
        return signOut(getAuth(this.firebase))
            .then(() => {
                this._token = undefined
                this._isAuthenticated = false
                this._userCredential = undefined
            })
            .catch(error => {
                throw new Error(error)
            })
    }

    public getToken(): string | undefined {
        return undefined
    }

    public getUserInfo(): UserInfo {
        console.log(this._userCredential, 123)

        return {
            name: this._userCredential?.user.displayName || this._userCredential?.user.email || '',
            email: this._userCredential?.user.email || '',
            username: this._userCredential?.user.displayName || this._userCredential?.user.email || '',
        }
    }

    // since firebase does not support roles out of the box, authenticated user has every role access
    public hasRole(role: string): boolean {
        return this.isAuthenticated()
    }

    public isAuthenticated(): boolean {
        return this._isAuthenticated
    }

    public validate(): void {
        // ignored
    }
}

export default FirebaseAuth