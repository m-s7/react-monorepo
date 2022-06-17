import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'Guide/components/error-fallback'
import CenteredLoader from 'Guide/components/centered-loader'
import { Card } from '@ms7/bui'
const UserViewer = React.lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return import('Guide/components/pages/index/lazy-suspense/user-viewer')
})

const LazySuspense = () => (
    <Card className="m-1 w-50">
        <Suspense fallback={<CenteredLoader text={'Loading lazily...'} />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <UserViewer />
            </ErrorBoundary>
        </Suspense>
    </Card>
)

export default LazySuspense