import React, { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { createMarker, IconColor } from 'Map/utils/leaflet-utils'
import { createMapManager, MapManager } from 'Map/business/map-manager'
import { LeafletMouseEvent, map } from 'leaflet'
import { Button, ButtonProps } from '@ms7/bui'
import { Card } from '@ms7/bui'
import styled from 'styled-components'

type MapMode = 'single' | 'group' | 'group-alt'

let mapManager: MapManager

const MapContainer = styled.div`
    height: 600px;
`

const ModeButton = (props: ButtonProps & { buttonMode: MapMode, currentMode: MapMode, clickHandler: (mode: MapMode) => void }) => (
    <Button
        variant={(props.currentMode === props.buttonMode ? 'primary' : 'secondary')}
        className="m-1"
        onClick={() => props.clickHandler(props.buttonMode)}>
        {props.children}
    </Button>

)

const Map = () => {
    const [mode, setMode] = useState<MapMode>('single')
    const stateRef = useRef<string>()
    stateRef.current = mode

    useEffect(() => {
        mapManager = createMapManager(map('map'), [54.571848, 16.820135], 15)
        mapManager.on('click', onMapClick)
    }, [])

    useEffect(() => () => {
        if(mapManager) {
            mapManager.off('click', onMapClick)
            mapManager.destroy()
        }
    }, [])
    
    const onMapClick = (e: LeafletMouseEvent) => {
        switch(stateRef.current) {
            case 'single':
                mapManager.addSingleMarker(createMarker(e.latlng, {}, IconColor.RED).on('click', onMarkerClick))
                break
            case 'group':
                mapManager.addMarker(createMarker(e.latlng, {}, IconColor.BLUE).on('click', onMarkerClick), 'markers')
                break
            case 'group-alt':
                mapManager.addMarker(createMarker(e.latlng, {}, IconColor.GREEN).on('click', onMarkerClick), 'markers-alt')
                break
        }
    }

    const onMarkerClick = (e: LeafletMouseEvent) => {
        mapManager.removeMarker(e.target)
    }

    return (
        <Card fillViewport={true}>
            <h5>{'Map Module'}</h5>
            <hr />
            <ul>
                <li>{`mode: ${mode}`}</li>
            </ul>
            <div className="d-flex flex-row mb-2">
                <ModeButton
                    buttonMode={'single'}
                    currentMode={mode}
                    clickHandler={() => setMode('single')}>
                    single
                </ModeButton>
                <ModeButton
                    buttonMode={'group'}
                    currentMode={mode}
                    clickHandler={() => setMode('group')}>
                    group
                </ModeButton>
                <ModeButton
                    buttonMode={'group-alt'}
                    currentMode={mode}
                    clickHandler={() => setMode('group-alt')}>
                    group-alt
                </ModeButton>
            </div>
            <MapContainer id="map" />
        </Card>
    )
}

export default Map