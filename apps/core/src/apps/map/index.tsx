import React from 'react'
import App from 'Map/app'

interface Props {
    parentLayout?: React.ElementType,
}

const Index = (props: Props) => (<App {...props} />)

export default Index