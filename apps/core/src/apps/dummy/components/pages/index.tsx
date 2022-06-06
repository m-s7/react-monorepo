import React, { useEffect } from 'react'
import BaseLink from '@/components/router/nav/base-link'
import { selectState1, selectState2, selectState3, setState1, setState2, setName, setType, setAge } from 'Dummy/store/reducers/person-reducer'
import { Button } from '@ms7/bui'
import TestProps from 'Dummy/components/test-props'
import { Card } from '@ms7/bui'
import { useAppDispatch } from 'Dummy/hooks/use-app-dispatch'
import { useAppSelector } from 'Dummy/hooks/use-app-selector'
import EventBus from '@ms7/event-bus'

const Dummy = () => {
    const state1 = useAppSelector(selectState1)
    const state2 = useAppSelector(selectState2)
    const state3 = useAppSelector(selectState3)
    const dispatch = useAppDispatch()

    const { name, type, age } = state3

    useEffect(() => {
        EventBus.subscribe('dummy-ws-message', x => {
            console.log('WS MSG RECEIVED', x)
        })
    }, [])

    useEffect(() => () => {
        EventBus.unsubscribe('dummy-ws-message')
    }, [])


    return (
        <Card fillViewport={true}>
            <h2>{'Dummy!'}</h2>
            <TestProps
                name={'Michał'}
                age={37}
                isAlive={true} />
            <TestProps
                name={'Monika'}
                age={11}
                isAlive={true} />
            <TestProps
                name={'Waldek'}
                age={22}
                isAlive={false} />
            <p>{`Redux: ${state1} - ${state2} - ${name} - ${type} - ${age}`}</p>
            <p>
                <Button onClick={() => dispatch(setState1(Math.floor(Math.random() * (100 - 1 + 1)) + 1))}>
                    {'Create Number'}
                </Button>
                <Button onClick={() => dispatch(setState2((Math.random() + 1).toString(36).substring(7)))}>
                    {'Create Something'}
                </Button>
                <Button onClick={() => dispatch(setName('Adam'))}>
                    {'Change Name'}
                </Button>
                <Button onClick={() => dispatch(setType('Chad'))}>
                    {'Change Type'}
                </Button>
                <Button onClick={() => dispatch(setAge((state3.age + 1)))}>
                    {'Increment Age'}
                </Button>
            </p>
            <h5>{'Dashboard:'}</h5>
            <BaseLink
                to='/'
                text='Dashboard' />
            <h5>{'Dummy App:'}</h5>
            <BaseLink
                to='/dummy/about'
                text='Dummy About' />
            <BaseLink
                to='/dummy/counter'
                text='Dummy Counter' />
        </Card>
    )
}

export default Dummy