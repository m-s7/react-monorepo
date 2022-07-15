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
            <ul>
                {users?.map(user => (
                    <li key={user.id}>
                        {`${t('user-viewer.label.user')}: #${user.id}`}
                        <ul>
                            <li>{`${t('user-viewer.label.name')}: ${user.name}`}</li>
                            <li>{`${t('user-viewer.label.age')}: ${user.age}`}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        )
    }
    
    return (<CenteredLoader text={t('user-viewer.loading')} />)
}

export default UserViewer