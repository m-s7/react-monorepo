import React, { Suspense } from 'react'
import CenteredLoader from 'Core/components/centered-loader'
import { Card } from '@ms7/ui'
import { useTranslation } from 'react-i18next'

const UserViewer = React.lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return import('Core/components/pages/index/lazy-suspense/user-viewer')
})

const LazyLoading = () => {
    const { t } = useTranslation()
    
    return (
        <div className="d-flex justify-content-center">
            <Card className="w-50">
                <CenteredLoader
                    text={t('lazy-suspense.loading')} />
            </Card>
        </div>
    )
}

const LazySuspense = () => (
    <Suspense fallback={<LazyLoading />}>
        <div className="d-flex justify-content-center">
            <Card className="w-50">
                <UserViewer />
            </Card>
        </div>
    </Suspense>
)

export default LazySuspense