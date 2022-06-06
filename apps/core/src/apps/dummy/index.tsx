import React from 'react'
import App from 'Dummy/app'
import { logging, LogLevel } from '@ms7/logger'

logging.addConfigurationOption({ minLevels: { 'websocket': LogLevel.ERROR }})

interface Props {
    parentLayout?: React.ElementType,
}

const Index = (props: Props) => (
    <App {...props} />
)

export default Index