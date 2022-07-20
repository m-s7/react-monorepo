import React, { useContext, useState } from 'react'
import { Card, LayoutEmpty } from '@ms7/ui'
import { FullPageLoader } from '@ms7/bui'
import Button from 'react-bootstrap/Button'
import { Trans, useTranslation } from 'react-i18next'
import { env } from '@ms7/common'
import { AuthProviderContext } from '@ms7/auth-providers'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const authContext = useContext(AuthProviderContext)

    const [error, setError] = useState<Error>()
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    if(!authContext || authContext.isAuthenticated())
        return (
            <Navigate
                to={'/'}
                replace={true} />
        )

    if(isAuthenticating)
        return (
            <LayoutEmpty>
                <FullPageLoader header={env.REACT_APP_NAME} />
            </LayoutEmpty>
        )

    return (
        <LayoutEmpty>
            <div className="d-flex flex-column justify-content-center">
                {error &&
                <div
                    className="alert alert-danger text-center"
                    role="alert">
                    <strong>{t('common.error')}:</strong> {t(`error.${error?.message}`)}
                </div>}
                <Card>
                    <form className="d-flex flex-column align-items-center p-4">
                        <FontAwesomeIcon
                            icon="lock"
                            size="4x"
                            className="mb-5" />
                        <h1 className="h3 mb-3 fw-normal">{t('page.login.label.please-sign-in')}</h1>
                        <div className="form-floating mb-1">
                            <input
                                value={email}
                                onInput={e => setEmail((e.target as HTMLInputElement).value)}
                                type="email"
                                className="form-control"
                                autoComplete="true"
                                id="floatingInput"
                                placeholder="name@example.com" />
                            <label htmlFor="floatingInput">{t('page.login.form.email-address')}</label>
                        </div>
                        <div className="form-floating mb-5">
                            <input
                                value={password}
                                onInput={e => setPassword((e.target as HTMLInputElement).value)}
                                type="password"
                                className="form-control"
                                autoComplete="true"
                                id="floatingPassword"
                                placeholder="Password" />
                            <label htmlFor="floatingPassword">{t('page.login.form.password')}</label>
                        </div>
                        {/*<div className="checkbox mb-3">*/}
                        {/*    <label>*/}
                        {/*        <input*/}
                        {/*            type="checkbox"*/}
                        {/*            value="remember-me" /> Remember me*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        <Button
                            onClick={e => {
                                e.preventDefault()
                                setIsAuthenticating(true)

                                authContext?.login({ email, password })
                                    .then(() => {
                                        navigate((location.state as { referrer: string } | null)?.referrer || '/')
                                    })
                                    .catch(error => {
                                        setError(error)
                                    })
                                    .finally(() => {
                                        setIsAuthenticating(false)
                                    })
                            }}
                            className="w-100 btn btn-lg btn-primary"
                            type="submit">
                            {t('page.login.button.sign-in')}
                        </Button>
                        <p className="mt-4 mb-3 text-muted">&copy; ms7</p>
                        <pre className="text-center">
                            <Trans
                                i18nKey={'page.login.label.info'}
                                components={{ br: <br /> }} />
                        </pre>
                    </form>
                </Card>
            </div>
        </LayoutEmpty>
    )
}

export default Login
