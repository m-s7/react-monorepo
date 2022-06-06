import React from 'react'
import App from 'Map/app'

interface Props {
    parentLayout?: React.ElementType,
}

const Entrypoint = (props: Props) => (
    <App {...props} />
)

export default Entrypoint