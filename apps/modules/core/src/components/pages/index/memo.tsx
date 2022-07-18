import React, { useState, useMemo, useEffect } from 'react'
import { Card, Button } from '@ms7/bui'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

type Theme = 'light' | 'dark'

interface ContentProps {
    theme: Theme,
}

const Content = styled.div<ContentProps>`
    background-color: ${props => props.theme === 'dark' ? 'black' : 'white'}
`

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
    const [theme, setTheme] = useState<Theme>('light')
    const multipliedNumber = useMemo(() => slowMultiply(number), [number])

    return (
        <div className="d-flex flex-row m-1">
            <Card className="me-1 w-50">
                <div className="d-flex flex-column align-items-center">
                    <input
                        className="mb-1"
                        type={'number'}
                        value={number}
                        onChange={e => { setNumber(Number(e.target.value))}} />
                    <Button
                        className="mb-1"
                        onClick={() => {
                            setTheme(prevState => (prevState === 'dark' ? 'light' : 'dark'))
                        }}>
                        {t('memo.button.change-theme')}
                    </Button>
                    <Content theme={theme}>
                        {`${t('memo.label.multiplied-number')}: ${multipliedNumber}`}
                    </Content>
                </div>
            </Card>
        </div>
    )
}

export default Memo