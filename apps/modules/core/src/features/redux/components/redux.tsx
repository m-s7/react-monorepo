import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useAppSelector } from 'Core/hooks/use-app-selector'
import { useAppDispatch } from 'Core/hooks/use-app-dispatch'
import { setId, setDescription, setName, setType, setAge } from 'Core/store/reducers/person-reducer'
import { Card } from '@ms7/ui'
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd } from 'Core/store/reducers/counter-reducer'
import { useTranslation } from 'react-i18next'

export const Redux = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    // person
    const id = useAppSelector(state => state.corePerson.id)
    const description = useAppSelector(state => state.corePerson.description)
    const { name, type, age } = useAppSelector(state => state.corePerson.data)

    // counter
    const { value, status } = useAppSelector(state => state.coreCounter)
    const [incrementAmount, setIncrementAmount] = useState(2)
    const incrementValue = incrementAmount

    return (
        <div className="d-flex justify-content-center w-100">
            <Card className="w-25 me-1">
                <div className="d-flex flex-column align-items-center">
                    <p>{t('redux.label.person-state')}</p>
                    <ul>
                        <li>{`id: ${id}`}</li>
                        <li>{`${t('redux.label.age')}: ${age}`}</li>
                        <li>{`${t('redux.label.name')}: ${name}`}</li>
                        <li>{`${t('redux.label.type')}: ${type}`}</li>
                        <li>{`${t('redux.label.desc')}: ${description}`}</li>
                    </ul>
                    <div className="d-flex flex-column w-50">
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setId(Math.floor(Math.random() * (100 - 1 + 1)) + 1))}>
                            {t('redux.button.change-id')}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setAge((age + 1)))}>
                            {t('redux.button.increment-age')}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setName((name === 'Mark' ? 'Claudia' : 'Mark')))}>
                            {t('redux.button.switch-name')}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setType(type === 'man' ? 'woman' : 'man'))}>
                            {t('redux.button.switch-type')}
                        </Button>
                        <Button
                            className="m-1 w-100"
                            onClick={() => dispatch(setDescription((Math.random() + 1).toString(36).substring(7)))}>
                            {t('redux.button.change-desc')}
                        </Button>
                    </div>
                </div>
            </Card>
            <Card className="w-25">
                <div className="d-flex flex-column align-items-center">
                    <p>{t('redux.label.counter-state')}</p>
                    <ul>
                        <li>{`${t('redux.label.counter')}: ${value}`}</li>
                        <li>{`${t('redux.label.status')}: ${status}`}</li>
                    </ul>
                    <div className="w-40">
                        <label className="d-block">{t('redux.label.increment')}</label>
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
                                {t('redux.button.add')}
                            </Button>
                            <Button
                                className="mb-2 w-100"
                                disabled={status === 'loading'}
                                onClick={() => dispatch(incrementAsync(incrementValue))}>
                                {t('redux.button.add-async')}
                            </Button>
                            <Button
                                className="mb-2 w-100"
                                onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                                {t('redux.button.add-if-odd')}
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
            </Card>
        </div>
    )
}
