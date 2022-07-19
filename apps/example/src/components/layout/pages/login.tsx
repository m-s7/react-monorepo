import React, { useState } from 'react'
import { Card, Icon, LayoutEmpty } from '@ms7/bui'
import { FirebaseLoginComponentProps } from '@/business/firebase/firebase-auth-provider'
import { Trans, useTranslation } from 'react-i18next'

const Login = (props: FirebaseLoginComponentProps) => {
    const { t } = useTranslation()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { error, onSubmit } = props

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
                        <Icon
                            variant={'lock'}
                            size={'4x'}
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
                        <button
                            onClick={e => {
                                e.preventDefault()
                                onSubmit({ email, password })
                            }}
                            className="w-100 btn btn-lg btn-primary"
                            type="submit">
                            {t('page.login.button.sign-in')}
                        </button>
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
