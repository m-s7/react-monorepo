import React, { useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { User } from 'Core/business/types/user'
import CenteredSpinner from 'Core/components/centered-spinner'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { getUsers } from 'Core/features/rest/api/rq-user-api'
import Table from 'react-bootstrap/Table'

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
                <Table
                    striped
                    bordered
                    variant="success">
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
                </Table>
            </>
        )
    }
    
    return (<CenteredSpinner text={t('user-viewer.loading')} />)
}

export default UserViewer