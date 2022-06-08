import React, { useState } from 'react'
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from 'Dummy/store/reducers/counter-reducer'
import styles from 'Dummy/components/pages/counter.module.css'
import { Card } from '@ms7/bui'
import { useAppDispatch } from 'Dummy/hooks/use-app-dispatch'
import { useAppSelector } from 'Dummy/hooks/use-app-selector'

const Counter = () => {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const [incrementAmount, setIncrementAmount] = useState('2')

    const incrementValue = Number(incrementAmount) || 0

    return (
        <Card fillViewport={true}>
            <h1>{'Dummy Counter!'}</h1>
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
        </Card>
    )
}

export default Counter