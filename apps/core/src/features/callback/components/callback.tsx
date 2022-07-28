import React, { useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { Card } from '@ms7/ui'
import { useTranslation } from 'react-i18next'
import CallbackList from 'Core/features/callback/components/callback-list'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

type Theme = 'table-success' | 'table-danger'

export const Callback = () => {
    const { t } = useTranslation()
    const [number, setNumber] = useState(0)
    const [theme, setTheme] = useState<Theme>('table-success')

    // important: referential equality () !== ()
    // use useCallback() only when passing function down the tree node or creating a function is slow (very unlikely)
    const getItems = useCallback((incrementBy: number) => [number + incrementBy, number + incrementBy + 1, number + incrementBy + 2], [number])

    return (
        <div className="d-flex justify-content-center w-100">
            <Card className="w-50">
                <Container>
                    <Row className="align-items-center justify-content-md-center mb-2">
                        <Col className="col-lg-6">
                            <div className="mb-3">
                                <Form.Label className="text-color-default">{t('callback.form.increment-by')}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={number}
                                    onChange={e => { setNumber(Number(e.target.value))}} />
                            </div>
                        </Col>
                        <Col className="col-lg-auto">
                            <Button
                                className="mt-3"
                                onClick={() => {
                                    setTheme(prevState => (prevState === 'table-success' ? 'table-danger' : 'table-success'))
                                }}>
                                {t('callback.button.change-theme')}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col className="col-md-auto">
                            <CallbackList
                                getItems={getItems}
                                className={`w-25 ${theme}`} />
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    )
}
