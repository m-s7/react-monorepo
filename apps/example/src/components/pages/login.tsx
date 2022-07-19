import React from 'react'
import { Card, Icon } from '@ms7/bui'

const Login = () => (
    <div className="d-flex justify-content-center">
        <Card>
            <form className="d-flex flex-column align-items-center p-4">
                <Icon
                    variant={'lock'}
                    size={'4x'}
                    className="mb-5" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating mb-1">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input
                            type="checkbox"
                            value="remember-me" /> Remember me
                    </label>
                </div>
                <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit">Sign in
                </button>
                <p className="mt-5 mb-3 text-muted">&copy; ms7</p>
            </form>
        </Card>
    </div>
)

export default Login
