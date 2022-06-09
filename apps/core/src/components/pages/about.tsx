import React, { useEffect } from 'react'
import { Card } from '@ms7/bui'
import { Button } from '@ms7/bui'
import EventBus from '@ms7/event-bus'
import { uniqueId } from 'lodash'
import { env } from '@ms7/common'

const About = () => {
    useEffect(() => {
        EventBus.subscribe('guide-ws-message', x => {
            console.log('WS MSG RECEIVED', x)
        })
        EventBus.subscribe('test-channel', x => {
            console.log('MSG REC ABT1', x)
            console.log(env)
            console.log(env.REACT_APP_GUIDE_WEBSOCKET_URL)
        })
        EventBus.subscribeOnce('test-channel', x => {
            console.log('MSG REC ABT2', x)
        })
        EventBus.subscribeTimes('test-channel', x => {
            console.log('MSG REC ABT3', x)
        }, 3)
    }, [])

    useEffect(() => () => {
        EventBus.unsubscribe('guide-ws-message')
        EventBus.unsubscribe('test-channel')
        EventBus.unsubscribe('test-channel')
        EventBus.unsubscribe('test-channel')
    }, [])

    const handleClick = () => {
        console.log('clicked', EventBus.listeners)
        EventBus.dispatch('test-channel', { 'uniqueId': uniqueId(), aaa: { bbb: 'ccc' }})
    }
    
    return (
        <Card fillViewport={true}>
            <h1>{'About'}</h1>
            <Button onClick={handleClick}>
                {'AAA'}
            </Button>
        </Card>
    )
}

export default About
