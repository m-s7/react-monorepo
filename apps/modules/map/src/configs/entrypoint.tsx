import React from 'react'
import { EntrypointConfig } from '@ms7/router'

// import Entrypoint from 'Map/entrypoint'
const Entrypoint = React.lazy(() => import('Map/entrypoint'))

const config: EntrypointConfig = {
    baseUrl: '/map/*',
    component: Entrypoint,
}

export default config