import React from 'react'
import { Card } from '@ms7/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLockOpen } from '@fortawesome/free-solid-svg-icons/faLockOpen'

const Admin = () => (
    <div className="d-flex justify-content-center">
        <Card>
            <div className="d-flex flex-column align-items-center p-4">
                <FontAwesomeIcon
                    icon={faLockOpen}
                    size="4x"
                    className="mb-5" />
                <h1>Admin Access</h1>
            </div>
        </Card>
    </div>
)

export default Admin
