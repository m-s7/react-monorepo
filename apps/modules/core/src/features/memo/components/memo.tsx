import React, { useState, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import { Card } from '@ms7/ui'
import { useTranslation } from 'react-i18next'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

type Theme = 'success' | 'danger'

const slowMultiply = (number: number) => {
    if(number === 0) return 0

    for(let i = 0; i <= 1000000000; i++) {
        // simulate slow function
    }

    return number * 2
}

export const Memo = () => {
    const { t } = useTranslation()
    const [number, setNumber] = useState(0)
    const [theme, setTheme] = useState<Theme>('success')
    const multipliedNumber = useMemo(() => slowMultiply(number), [number])

    return (
        <div className="d-flex justify-content-center w-100">
            <Card className="w-50">
                <Container>
                    <Row className="align-items-center justify-content-md-center mb-2">
                        <Col className="col-lg-6">
                            <div className="mb-3">
                                <Form.Label>{t('memo.form.multiply-by')}</Form.Label>
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
                                    setTheme(prevState => (prevState === 'success' ? 'danger' : 'success'))
                                }}>
                                {t('memo.button.change-theme')}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="row justify-content-md-center">
                        <Col className="col-md-auto">
                            <Table variant={theme}>
                                <tbody>
                                    <tr>
                                        <td>{`${t('memo.label.multiplied-number')}: ${multipliedNumber}`}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    )
}
