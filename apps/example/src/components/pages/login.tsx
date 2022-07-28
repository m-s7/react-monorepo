import React, { FormEvent, useContext, useState } from 'react'
import { Card, FullPageSpinner } from '@ms7/ui'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { AuthProviderContext } from '@ms7/auth'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import styled from 'styled-components'

const StyledForm = styled(Form)`
    max-width: 250px;
`

const Login = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const authContext = useContext(AuthProviderContext)

    const [error, setError] = useState<Error>()
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isValidated, setIsValidated] = useState(false)

    if(!authContext || authContext.isAuthenticated())
        return (
            <Navigate
                to="/"
                replace={true} />
        )

    if(isAuthenticating)
        return (<FullPageSpinner useDefaults />)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget
        const isValid = form.checkValidity()
        if(!isValid) {
            event.preventDefault()
            event.stopPropagation()
        }

        setIsValidated(true)

        if(isValid) {
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
        }
    }
    
    return (
        <>
            {error &&
                <div
                    className="alert alert-danger text-center"
                    role="alert">
                    <strong>{t('common.error')}:</strong> {t(`error.${error?.message}`)}
                </div>}
            <Card>
                <div className="d-flex flex-column align-items-center p-5">
                    <FontAwesomeIcon
                        icon={faLock}
                        size="4x"
                        className="mb-4" />
                    <h1 className="h3 mb-4 fw-normal">{t('page.login.label.please-sign-in')}</h1>
                    <StyledForm
                        noValidate
                        validated={isValidated}
                        onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={t('page.login.form.email-address')}
                            className="mb-3">
                            <Form.Control
                                required
                                type="email"
                                value={email}
                                onInput={e => setEmail((e.target as HTMLInputElement).value)}
                                placeholder={t('page.login.form.placeholder.email-address')} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floating-password"
                            label={t('page.login.form.password')}>
                            <Form.Control
                                required
                                type="password"
                                value={password}
                                onInput={e => setPassword((e.target as HTMLInputElement).value)}
                                placeholder={t('page.login.form.placeholder.password')} />
                        </FloatingLabel>
                        {/*<div className="checkbox mb-3">*/}
                        {/*    <label>*/}
                        {/*        <input*/}
                        {/*            type="checkbox"*/}
                        {/*            value="remember-me" /> Remember me*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        <hr />
                        <Button
                            className="w-100 btn btn-lg btn-primary"
                            type="submit">
                            {t('page.login.button.sign-in')}
                        </Button>
                    </StyledForm>
                    <p className="mt-4 text-muted">&copy; ms7</p>
                </div>
            </Card>
        </>
    )
}

export default Login
