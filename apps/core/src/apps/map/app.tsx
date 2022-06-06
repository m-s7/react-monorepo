import React from 'react'
import AppRouter from 'Map/app-router'

interface Props {
    parentLayout?: React.ElementType,
}

const App = (props: Props) =>  (<AppRouter {...props} />)


export default App