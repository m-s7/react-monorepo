import React, { useContext, useState } from 'react'
import { Card, LayoutEmpty, FullPageSpinner } from '@ms7/ui'
import Button from 'react-bootstrap/Button'
import { Trans, useTranslation } from 'react-i18next'
import { env } from '@ms7/common'
import { AuthProviderContext } from '@ms7/auth'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Form from 'react-bootstrap/Form'

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
                to="/"
                replace={true} />
        )

    if(isAuthenticating)
        return (
            <LayoutEmpty>
                <FullPageSpinner header={env.REACT_APP_NAME} />
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
                    <div className="d-flex flex-column align-items-center p-4">
                        <FontAwesomeIcon
                            icon={faLock}
                            size="4x"
                            className="mb-4" />
                        <h1 className="h3 mb-4 fw-normal">{t('page.login.label.please-sign-in')}</h1>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formEmail">
                                <Form.Label>{t('page.login.form.email-address')}</Form.Label>
                                <Form.Control
                                    className="text-color-link"
                                    value={email}
                                    onInput={e => setEmail((e.target as HTMLInputElement).value)}
                                    type="email"
                                    placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 border-success"
                                controlId="formPassword">
                                <Form.Label>{t('page.login.form.password')}</Form.Label>
                                <Form.Control
                                    className="border-success"
                                    type="password"
                                    value={password}
                                    onInput={e => setPassword((e.target as HTMLInputElement).value)}
                                    placeholder="Enter password" />
                            </Form.Group>
                            {/*<div className="checkbox mb-3">*/}
                            {/*    <label>*/}
                            {/*        <input*/}
                            {/*            type="checkbox"*/}
                            {/*            value="remember-me" /> Remember me*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                            <hr />
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
                        </Form>
                        <p className="mt-4 mb-3 text-muted">&copy; ms7</p>
                        <pre className="text-center">
                            <Trans
                                i18nKey="page.login.label.info"
                                components={{ br: <br /> }} />
                        </pre>
                    </div>
                </Card>
            </div>
        </LayoutEmpty>
    )
}

export default Login
