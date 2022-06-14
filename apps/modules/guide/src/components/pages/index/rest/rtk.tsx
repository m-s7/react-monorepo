import React from 'react'
import { Button } from '@ms7/bui'
import { useGetUsersQuery, useLazyGetUserQuery } from 'Guide/api/rtk-user-api'
import { getNormalizedError } from 'Guide/business/lib/rtk/utils'
import CenteredLoader from 'Guide/components/centered-loader'
import ErrorFallback from 'Guide/components/error-fallback'
import { LoaderSmall } from '@ms7/bui'

const RestRTK = () => {
    const { data: users, error, isFetching, refetch } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: false, skip: false })
    const [trigger, { data: user, isFetching: isFetchingLazy, error: errorLazy }] = useLazyGetUserQuery()

    if(isFetching)
        return (<CenteredLoader text={'Loading users...'} />)

    const User = () => {
        if(!isFetchingLazy) {
            if(errorLazy)
                return (<div className="danger">{`Error: ${getNormalizedError(errorLazy)?.message}`}</div>)

            if(user)
                return (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>)
        }

        return null
    }

    const Users = () => (
        <React.Fragment>
            {users?.map(user => (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>))}
        </React.Fragment>

    )

    return (
        <ErrorFallback
            error={getNormalizedError(error)}
            onRetry={() => refetch()}>
            <div className="d-flex flex-row p-3">
                <div className="w-25">
                    <p>Actions</p>
                    <Button
                        className="m-1 w-75"
                        disabled={isFetchingLazy}
                        onClick={() => trigger(Math.floor(Math.random() * 9))}>
                        {isFetchingLazy ? <LoaderSmall /> : 'get user'}
                    </Button>
                </div>
                <div className="w-25">
                    <p>Results Lazy</p>
                    <User />
                </div>
                <div className="w-25">
                    <p>Results</p>
                    <Users />
                </div>
            </div>
        </ErrorFallback>
    )
}

export default RestRTK