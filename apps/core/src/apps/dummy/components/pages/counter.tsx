import React, { useState } from 'react'
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from 'Dummy/store/reducers/counter-reducer'
import styles from 'Dummy/components/pages/counter.module.css'
import BaseLink from '@/components/router/nav/base-link'
import Card from '@/components/ui/card/card'
import { useAppDispatch } from '@/hooks/use-app-dispatch'
import { useAppSelector } from '@/hooks/use-app-selector'

const Counter = () => {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const [incrementAmount, setIncrementAmount] = useState('2')

    const incrementValue = Number(incrementAmount) || 0

    return (
        <Card fillViewport={true}>
            <h2>{'Dummy Counter!'}</h2>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}>
                    {'-'}
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}>
                    {'+'}
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(e.target.value)} />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(incrementValue))}>
                    {'Add Amount'}
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrementAsync(incrementValue))}>
                    {'Add Async'}
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                    {'Add If Odd'}
                </button>
            </div>
            <h5>{'Dashboard:'}</h5>
            <BaseLink
                to='/'
                text='Dashboard' />
            <h5>{'Dummy App:'}</h5>
            <BaseLink
                to='/dummy'
                text='Dummy' />
            <BaseLink
                to='/dummy/about'
                text='Dummy About' />
        </Card>
    )
}

export default Counter