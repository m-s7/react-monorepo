import React, { useState } from 'react'
import { useAppSelector } from 'Guide/hooks/use-app-selector'
import { useAppDispatch } from 'Guide/hooks/use-app-dispatch'
import { setId, setDescription, setName, setType, setAge } from 'Guide/store/reducers/person-reducer'
import { Button } from '@ms7/bui'
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    incrementIfOdd, 
} from 'Guide/store/reducers/counter-reducer'

const Redux = () => {
    const dispatch = useAppDispatch()

    // person
    const id = useAppSelector(state => state.guidePerson.id)
    const description = useAppSelector(state => state.guidePerson.description)
    const { name, type, age } = useAppSelector(state => state.guidePerson.data)

    // counter
    const { value, status } = useAppSelector(state => state.guideCounter)
    const [incrementAmount, setIncrementAmount] = useState(2)
    const incrementValue = incrementAmount

    return (
        <React.Fragment>
            <h5>{'Redux Example'}</h5>
            <div className="d-flex flex-row p-3">
                <div className="w-30">
                    <p>Person State:</p>
                    <ul>
                        <li>{`id: ${id}`}</li>
                        <li>{`age: ${age}`}</li>
                        <li>{`name: ${name}`}</li>
                        <li>{`type: ${type}`}</li>
                        <li>{`desc: ${description}`}</li>
                    </ul>
                    <div className="d-flex flex-column w-50">
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setId(Math.floor(Math.random() * (100 - 1 + 1)) + 1))}>
                            {'change id'}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setAge((age + 1)))}>
                            {'increment age'}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setName((name === 'Mark' ? 'Claudia' : 'Mark')))}>
                            {'switch name'}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setType(type === 'man' ? 'woman' : 'man'))}>
                            {'switch type'}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setDescription((Math.random() + 1).toString(36).substring(7)))}>
                            {'change description'}
                        </Button>
                    </div>
                </div>
                <div className="50">
                    <p>Counter State:</p>
                    <ul>
                        <li>{`counter: ${value}`}</li>
                        <li>{`status: ${status}`}</li>
                    </ul>
                    <div className="w-40">
                        <label className="d-block">increment amount</label>
                        <div>
                            <input
                                className="text-black w-100"
                                value={incrementValue}
                                type='number'
                                onChange={e => setIncrementAmount(Number(e.target.value))} />
                        </div>
                        <div className="mt-3">
                            <Button
                                className="mb-2 w-100"
                                onClick={() => dispatch(incrementByAmount(incrementValue))}>
                                add
                            </Button>
                            <Button
                                className="mb-2 w-100"
                                disabled={status === 'loading'}
                                onClick={() => dispatch(incrementAsync(incrementValue))}>
                                add async
                            </Button>
                            <Button
                                className="mb-2 w-100"
                                onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                                add if odd
                            </Button>
                            <div className="d-flex flex-row">
                                <Button
                                    className="w-50 me-1"
                                    onClick={() => dispatch(increment())}>
                                    +
                                </Button>
                                <Button
                                    className="w-50 ms-1"
                                    onClick={() => dispatch(decrement())}>
                                    -
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Redux