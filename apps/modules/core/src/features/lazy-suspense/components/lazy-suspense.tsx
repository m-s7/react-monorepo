import React, { Suspense } from 'react'
import { Card } from '@ms7/ui'
import { useTranslation } from 'react-i18next'
import CenteredSpinner from 'Core/components/centered-spinner'

const UserViewer = React.lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return import('Core/features/lazy-suspense/components/user-viewer')
})

const LazyLoading = () => {
    const { t } = useTranslation()

    return (
        <div className="d-flex justify-content-center">
            <Card className="w-50">
                <CenteredSpinner text={t('lazy-suspense.loading')} />
            </Card>
        </div>
    )
}

export const LazySuspense = () => (
    <Suspense fallback={<LazyLoading />}>
        <div className="d-flex justify-content-center">
            <Card className="w-50">
                <UserViewer />
            </Card>
        </div>
    </Suspense>
)
