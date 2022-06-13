import React, { useEffect, useState } from 'react'
import { uniqueId } from 'lodash'
import { Button } from '@ms7/bui'
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
        <React.Fragment>
            <h5>{'RxJsSubscribe Example'}</h5>
            <ul>
                <li>{`Subject: ${subject ? 'created' : '-----'}`}</li>
                <li>{`Subscription: ${subscription ? 'active' : '-----'}`}</li>
            </ul>
            <hr />
            <div className="d-flex flex-column w-50">
                <span>Create subject.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => { setSubject(new Subject<Message>()) }}>
                    create
                </Button>
                <hr />
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
                <hr />
                <span>Dispatch subject message, output will be logged in console.</span>
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
                <hr />
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
                <hr />
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
        </React.Fragment>
    )
}

export default RxJsSubject