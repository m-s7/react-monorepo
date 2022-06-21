import React from 'react'
import AppRouter from 'Map/app-router'
import { EntrypointComponentProps } from '@ms7/router'

const App = (props: EntrypointComponentProps) => (<AppRouter {...props} />)

export default App