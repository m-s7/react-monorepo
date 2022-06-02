import React, { useEffect } from 'react'
import Layout from '@/layouts/layout'
import BaseLink from '@/components/router/nav/base-link'
import Card from '@/components/ui/card/card'
import Button from '@/components/ui/button'
import EventBus from '@ms7/event-bus'
import { uniqueId } from 'lodash'

const About = () => {
    useEffect(() => {
        EventBus.subscribe('dummy-ws-message', x => {
            console.log('WS MSG RECEIVED', x)
        })
        EventBus.subscribe('test-channel', x => {
            console.log('MSG REC ABT1', x)
        })
        EventBus.subscribeOnce('test-channel', x => {
            console.log('MSG REC ABT2', x)
        })
        EventBus.subscribeTimes('test-channel', x => {
            console.log('MSG REC ABT3', x)
        }, 3)
    }, [])

    useEffect(() => () => {
        EventBus.unsubscribe('dummy-ws-message')
        EventBus.unsubscribe('test-channel')
        EventBus.unsubscribe('test-channel')
        EventBus.unsubscribe('test-channel')
    }, [])

    const handleClick = () => {
        console.log('clicked', EventBus.listeners)
        EventBus.dispatch('test-channel', { 'uniqueId': uniqueId(), aaa: { bbb: 'ccc' }})
    }
    
    return (
        <Layout>
            <Card fillViewport={true}>
                <Button onClick={handleClick}>
                    {'AAA'}
                </Button>
                <h2>{'About'}</h2>
                <BaseLink
                    to='/'
                    text='Dashboard' />
            </Card>
        </Layout>
    )
}

export default About
