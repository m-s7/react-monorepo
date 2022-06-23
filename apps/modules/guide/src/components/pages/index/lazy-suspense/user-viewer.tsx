import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { User } from 'Guide/business/types/user'
import { getUsers } from 'Guide/api/redux-user-api'
import CenteredLoader from 'Guide/components/centered-loader'
import { useTranslation } from 'react-i18next'

const UserViewer = () => {
    const { t } =  useTranslation()

    const handleError = useErrorHandler()
    const [users, setUsers] = useState<User[]>()

    useEffect(() => {
        setTimeout(() => {
            getUsers()
                .then(users => setUsers(users))
                .catch(error => handleError(error))
        }, 1000)
    }, [])

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