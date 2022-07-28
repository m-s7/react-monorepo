import React from 'react'
import { Outlet } from 'react-router-dom'
import { WebsocketProvider } from '@ms7/websocket'
import CoreWebsocketProvider from 'Core/providers/core-websocket-provider'

const Index = () => (
    <WebsocketProvider provider={CoreWebsocketProvider}>
        <Outlet />
    </WebsocketProvider>
)

export default Index