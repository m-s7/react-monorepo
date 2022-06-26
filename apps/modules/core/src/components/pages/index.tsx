import React from 'react'
import { Card } from '@ms7/bui'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Index = () => {
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <Card>
                <p>{t('index.info1')}</p>
                <p>{t('index.info2')}</p>
            </Card>
            <Outlet />
        </React.Fragment>
    )
}

export default Index