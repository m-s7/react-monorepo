import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'Guide/components/error-fallback'
import CenteredLoader from 'Guide/components/centered-loader'
const UserViewer = React.lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 2500))

    return import('Guide/components/pages/index/lazy-suspense/user-viewer')
})

const LazySuspense = () => (
    <React.Fragment>
        <h5>{'LazySuspense Example'}</h5>
        <div className="p-3">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <UserViewer />
            </ErrorBoundary>
        </div>
    </React.Fragment>
)

export default LazySuspense