import React, { useState } from 'react'
import { uniqueId } from 'lodash'
import { Button, Card } from '@ms7/bui'
import { Subject, Subscription } from 'rxjs'

interface Message {
    data: {
        id: number,
        message: string,
    },
}

const RxJsSubject = () => {
    const [subject, setSubject] = useState<Subject<Message> | undefined>()
    const [subscription, setSubscription] = useState<Subscription | undefined>()

    return (
        <div className="d-flex">
            <Card className="m-1 w-50">
                <div className="d-flex flex-column align-items-center">
                    <div className="w-50 mt-3 p-1 text-center border border-white border-1">
                        <div>{`Subject: ${subject ? 'created' : '-----'}`}</div>
                        <div>{`Subscription: ${subscription ? 'active' : '-----'}`}</div>
                    </div>
                    <hr />
                    <span>Create subject.</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            setSubject(new Subject<Message>())
                        }}>
                        create
                    </Button>
                    <hr className="w-50" />
                    <span>Subscribe subject.</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            setSubscription(subject?.subscribe({
                                next: v => console.log('subject message received', v),
                            }))
                        }}>
                        subscribe
                    </Button>
                    <hr className="w-50" />
                    <span>Dispatch subject message (output logged in console).</span>
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
                        dispatch
                    </Button>
                    <hr className="w-50" />
                    <span>Unsubscribe subject.</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            if(subscription) {
                                subscription.unsubscribe()
                                setSubscription(undefined)
                            }
                        }}>
                        unsubscribe
                    </Button>
                    <hr className="w-50" />
                    <span>Remove subject.</span>
                    <Button
                        className="mt-3 w-50"
                        onClick={() => {
                            if(subscription) {
                                subscription.unsubscribe()
                                setSubscription(undefined)
                            }

                            setSubject(undefined)
                        }}>
                        remove
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default RxJsSubject