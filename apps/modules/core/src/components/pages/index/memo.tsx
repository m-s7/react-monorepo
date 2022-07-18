import React, { useState, useMemo, useEffect } from 'react'
import { Card, Button } from '@ms7/bui'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import CallbackList from 'Core/components/callback-list'

type Theme = 'table-success' | 'table-danger'

const slowMultiply = (number: number) => {
    if(number === 0) return 0

    for(let i = 0; i <= 1000000000; i++) {
        // simulate slow function
    }

    return number * 2
}

const Memo = () => {
    const { t } = useTranslation()
    const [number, setNumber] = useState(0)
    const [theme, setTheme] = useState<Theme>('table-success')
    const multipliedNumber = useMemo(() => slowMultiply(number), [number])

    return (
        <div className="d-flex justify-content-center">
            <Card className="w-50">
                <div className="container">
                    <div className="row align-items-center justify-content-md-center mb-2">
                        <div className="col col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">{t('memo.form.multiply-by')}</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={number}
                                    onChange={e => { setNumber(Number(e.target.value))}} />
                            </div>
                        </div>
                        <div className="col-lg-auto">
                            <Button
                                className="mt-3"
                                onClick={() => {
                                    setTheme(prevState => (prevState === 'table-success' ? 'table-danger' : 'table-success'))
                                }}>
                                {t('memo.button.change-theme')}
                            </Button>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <table className={`table ${theme}`}>
                                <tbody>
                                    <tr>
                                        <td>{`${t('memo.label.multiplied-number')}: ${multipliedNumber}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Memo