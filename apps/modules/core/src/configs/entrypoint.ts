import React from 'react'
import { EntrypointConfig } from '@ms7/router'

const Entrypoint = React.lazy(async () => import('Core/entrypoint'))

const config: EntrypointConfig = {
    baseUrl: '/core/*',
    component: Entrypoint,
}

export default config