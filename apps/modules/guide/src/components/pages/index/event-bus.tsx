import React, { useEffect } from 'react'
import EBus from '@ms7/event-bus'
import { uniqueId } from 'lodash'
import { Button, Card } from '@ms7/bui'

const EventBus = () => (
    <div className="d-flex flex-column">
        <Card className="m-1 w-50">
            <div
                className="alert alert-warning text-center m-1"
                role="alert">
                EventBus is an anti-pattern and should be avoided.
                <br />
                For event-based apps you should use observables based libraries (ex. rxjs).
            </div>
            <div className="d-flex flex-column align-items-center mt-3">
                <span>Register channel.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => EBus.register('test-channel')}>
                    register
                </Button>
                <hr className="w-50" />
                <span>Subscribe channel.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => {
                        EBus.subscribe('test-channel', x => {
                            console.log('message received sub1', x)
                        })
                        EBus.subscribeOnce('test-channel', x => {
                            console.log('message received sub2', x)
                        })
                        EBus.subscribeTimes('test-channel', x => {
                            console.log('message received sub3', x)
                        }, 3)
                    }}>
                    subscribe
                </Button>
                <hr className="w-50" />
                <span>Dispatch message to channel (output logged in console).</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => EBus.dispatch('test-channel', { 'uniqueId': uniqueId(), data: { message: 'hello' }})}>
                    dispatch
                </Button>
                <hr className="w-50" />
                <span>Unsubscribe channel.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => {
                        EBus.unsubscribe('test-channel')
                        EBus.unsubscribe('test-channel')
                        EBus.unsubscribe('test-channel')
                    }}>
                    unsubscribe
                </Button>
                <hr className="w-50" />
                <span>Unregister channel.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => {
                        EBus.unregister('test-channel')
                    }}>
                    unregister
                </Button>
            </div>
        </Card>
    </div>
)

export default EventBus