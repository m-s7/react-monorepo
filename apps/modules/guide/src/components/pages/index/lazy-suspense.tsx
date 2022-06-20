import React, { Suspense } from 'react'
import CenteredLoader from 'Guide/components/centered-loader'
import { Card } from '@ms7/bui'

const UserViewer = React.lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return import('Guide/components/pages/index/lazy-suspense/user-viewer')
})

const LazyLoading = () => (
    <div className="d-flex justify-content-center">
        <Card className="m-1 w-50">
            <CenteredLoader
                text={'Loading lazily...'} />
        </Card>
    </div>
)

const LazySuspense = () => (
    <Suspense fallback={<LazyLoading />}>
        <Card className="m-1 w-50">
            <UserViewer />
        </Card>
    </Suspense>
)

export default LazySuspense