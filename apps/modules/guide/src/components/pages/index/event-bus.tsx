import React, { useEffect } from 'react'
import EBus from '@ms7/event-bus'
import { uniqueId } from 'lodash'
import { Button } from '@ms7/bui'

const EventBus = () => {

    useEffect(() => {
        EBus.subscribe('test-channel', x => {
            console.log('message received sub1', x)
        })
        EBus.subscribeOnce('test-channel', x => {
            console.log('message received sub2', x)
        })
        EBus.subscribeTimes('test-channel', x => {
            console.log('message received sub3', x)
        }, 3)
    }, [])

    useEffect(() => () => {
        EBus.unsubscribe('guide-ws-message')
        EBus.unsubscribe('test-channel')
        EBus.unsubscribe('test-channel')
        EBus.unsubscribe('test-channel')
    }, [])

    return (
        <React.Fragment>
            <h5>{'EventBus Example'}</h5>
            <div className="d-flex flex-column w-50">
                <span>Register channel.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => EBus.register('test-channel')}>
                    register
                </Button>
                <hr />
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
                <hr />
                <span>Dispatch message to channel, output will be logged in console.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => EBus.dispatch('test-channel', { 'uniqueId': uniqueId(), data: { message: 'hello' }})}>
                    dispatch
                </Button>
                <hr />
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
                <hr />
                <span>Unregister channel.</span>
                <Button
                    className="mt-3 w-50"
                    onClick={() => { EBus.unregister('test-channel') }}>
                    unregister
                </Button>
            </div>
        </React.Fragment>
    )
}

export default EventBus