import React from 'react'
import { Card, Icon } from '@ms7/bui'

const Admin = () => (
    <div className="d-flex justify-content-center">
        <Card>
            <div className="d-flex flex-column align-items-center p-4">
                <Icon
                    variant={'lock-open'}
                    size={'4x'}
                    className="mb-5" />
                <h1>Admin Access</h1>
            </div>
        </Card>
    </div>
)

export default Admin
