import React, { Suspense } from 'react'
import CenteredLoader from 'Core/components/centered-loader'
import { Card } from '@ms7/bui'
import { useTranslation } from 'react-i18next'

const UserViewer = React.lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return import('Core/components/user-viewer')
})

const LazyLoading = () => {
    const { t } = useTranslation()
    
    return (
        <div className="d-flex justify-content-center">
            <Card className="m-1 w-50">
                <CenteredLoader
                    text={t('lazy-suspense.loading')} />
            </Card>
        </div>
    )
}

const LazySuspense = () => (
    <Suspense fallback={<LazyLoading />}>
        <div className="d-flex justify-content-center">
            <Card className="m-1 w-50">
                <UserViewer />
            </Card>
        </div>
    </Suspense>
)

export default LazySuspense