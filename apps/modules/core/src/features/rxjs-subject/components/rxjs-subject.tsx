import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { uniqueId } from 'lodash'
import { Card } from '@ms7/ui'
import { Subject, Subscription } from 'rxjs'
import { useTranslation } from 'react-i18next'

interface Message {
    data: {
        id: number,
        message: string,
    },
}

export const RxJsSubject = () => {
    const { t } = useTranslation()
    const [subject, setSubject] = useState<Subject<Message> | undefined>()
    const [subscription, setSubscription] = useState<Subscription | undefined>()

    return (
        <div className="d-flex justify-content-center">
            <Card className="w-50">
                <div className="d-flex flex-column align-items-center">
                    <div
                        className="alert alert-warning text-center m-2 w-50"
                        role="alert">
                        <div className="text-dark">{`${t('rxjs-subject.subject')}: ${subject ? 'created' : '-----'}`}</div>
                        <div className="text-dark">{`${t('rxjs-subject.subscription')}: ${subscription ? 'active' : '-----'}`}</div>
                    </div>
                    <hr className="w-50" />
                    <span>{t('rxjs-subject.label.create')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            setSubject(new Subject<Message>())
                        }}>
                        {t('rxjs-subject.button.create')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('rxjs-subject.label.subscribe')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            setSubscription(subject?.subscribe({
                                next: v => console.log('subject message received', v),
                            }))
                        }}>
                        {t('rxjs-subject.button.subscribe')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('rxjs-subject.label.dispatch')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            subject?.next({
                                data: {
                                    id: Math.random(),
                                    message: uniqueId(),
                                },
                            })
                        }}>
                        {t('rxjs-subject.button.dispatch')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('rxjs-subject.label.unsubscribe')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            if(subscription) {
                                subscription.unsubscribe()
                                setSubscription(undefined)
                            }
                        }}>
                        {t('rxjs-subject.button.unsubscribe')}
                    </Button>
                    <hr className="w-50" />
                    <span>{t('rxjs-subject.label.remove')}</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            if(subscription) {
                                subscription.unsubscribe()
                                setSubscription(undefined)
                            }

                            setSubject(undefined)
                        }}>
                        {t('rxjs-subject.button.remove')}
                    </Button>
                </div>
            </Card>
        </div>
    )
}
