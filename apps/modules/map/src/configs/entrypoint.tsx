import React from 'react'
import { EntrypointConfig } from '@ms7/router'

const Entrypoint = React.lazy(() => import('Map/entrypoint'))

const config: EntrypointConfig = {
    baseUrl: '/map/*',
    component: Entrypoint,
}

export default config