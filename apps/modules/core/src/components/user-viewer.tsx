import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { User } from 'Core/business/types/user'
import CenteredLoader from 'Core/components/centered-loader'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { getUsers } from 'Core/api/rq-user-api'

const UserViewer = () => {
    const { t } =  useTranslation()
    const handleError = useErrorHandler()
    const [users, setUsers] = useState<User[]>()

    useQuery<User[], Error>(['users'], getUsers, {
        retry: false,
        onError: error => { handleError(error) },
        onSuccess: data => { setTimeout(() => setUsers(data), 1000) },
    })

    if(users) {
        return (
            <>
                <h5>{t('user-viewer.label.users')}:</h5>
                <hr />
                <table className="table table-striped table-success">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('user-viewer.label.name')}</th>
                            <th scope="col">{t('user-viewer.label.age')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user.id}>
                                <td scope="row">{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }
    
    return (<CenteredLoader text={t('user-viewer.loading')} />)
}

export default UserViewer