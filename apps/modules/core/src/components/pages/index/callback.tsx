import React, { useState, useCallback } from 'react'
import { Card, Button } from '@ms7/bui'
import { useTranslation } from 'react-i18next'
import CallbackList from 'Core/components/callback-list'

type Theme = 'table-success' | 'table-danger'

const Callback = () => {
    const { t } = useTranslation()
    const [number, setNumber] = useState(0)
    const [theme, setTheme] = useState<Theme>('table-success')

    // important: referential equality () !== ()
    // use useCallback() only when passing function down the tree node or creating function is slow (very unlikely)
    const getItems = useCallback((incrementBy: number) => [number + incrementBy, number + incrementBy + 1, number + incrementBy + 2], [number])

    return (
        <div className="d-flex justify-content-center">
            <Card className="w-50">
                <div className="container">
                    <div className="row align-items-center justify-content-md-center mb-2">
                        <div className="col col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">{t('callback.form.increment-by')}</label>
                                <input
                                    type="number"
                                    className="form-control"
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
                                {t('callback.button.change-theme')}
                            </Button>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <CallbackList
                                getItems={getItems}
                                className={`w-25 ${theme}`} />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Callback
