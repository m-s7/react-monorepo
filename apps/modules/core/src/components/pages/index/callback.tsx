import React, { useState, useCallback } from 'react'
import { Card, Button } from '@ms7/bui'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import CallbackList from 'Core/components/callback-list'

type Theme = 'light' | 'dark'

interface ContentProps {
    theme: Theme,
}

const Content = styled.div<ContentProps>`
    background-color: ${props => props.theme === 'dark' ? 'black' : 'white'}
`

const Callback = () => {
    const { t } = useTranslation()
    const [number, setNumber] = useState(0)
    const [theme, setTheme] = useState<Theme>('light')

    // important: referential equality () !== ()
    // use useCallback() only when passing function down the tree node or creating function is slow (very unlikely)
    const getItems = useCallback((incrementBy: number) => [number + incrementBy, number + incrementBy + 1, number + incrementBy + 2], [number])

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
                        <CallbackList getItems={getItems} />
                    </Content>
                </div>
            </Card>
        </div>
    )
}

export default Callback