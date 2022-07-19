import { AuthModel, UserInfo } from '@ms7/auth-providers'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, UserCredential, AuthError, signOut } from 'firebase/auth'

interface FirebaseCallback {
    (isAuthenticated: boolean, error?: Error | undefined): void,
}

class FirebaseAuth implements AuthModel {
    private readonly options: FirebaseOptions
    private readonly callback: FirebaseCallback
    private readonly allowLogger: boolean

    private firebase: FirebaseApp | undefined = undefined
    private _isAuthenticated = false
    private _userCredential: UserCredential | undefined

    constructor(options: FirebaseOptions, callback: FirebaseCallback, allowLogger = true) {
        this.options = options
        this.callback = callback
        this.allowLogger = allowLogger
    }

    init(credentials: { email: string, password: string }): void {
        this.firebase = initializeApp(this.options)
        signInWithEmailAndPassword(getAuth(this.firebase), 'smolik.it@gmail.com', 'admin123')
            .then((userCredential: UserCredential) => {
                this._isAuthenticated = true
                this._userCredential = userCredential

                this.callback(true)
            })
            .catch((authError: AuthError) => {
                this.callback(false, new Error('Firebase - ' + authError.message))
            })
    }

    getLogoutUrl(): URL {
        console.log('LOGOUT!!!!!!!')

        return new URL('aaa')
    }

    getToken(): string | undefined {
        return undefined
    }

    getUserInfo(): UserInfo {
        return {
            name: this._userCredential?.user.displayName || '',
            email: this._userCredential?.user.email || '',
            username: this._userCredential?.user.displayName || '',
        }
    }

    hasRole(role: string): boolean {
        return false
    }

    isAuthenticated(): boolean {
        return this._isAuthenticated
    }

    validate(): void {
        //TODO: implement
    }
}

export default FirebaseAuth