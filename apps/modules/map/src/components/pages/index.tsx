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
    min-height: 500px;
    height: 100%;
`

const ModeButton = (props: ButtonProps & { mode: MapMode, currentMode: MapMode, clickHandler: (mode: MapMode) => void }) => {
    const { mode, currentMode, clickHandler } = props
    
    return (
        <Button
            variant={(currentMode === mode ? 'primary' : 'secondary')}
            className="m-1"
            onClick={() => clickHandler(mode)}>
            {props.children}
        </Button>

    )
}

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

    const setModeHandler = (mode: MapMode) => {
        setMode(mode)
    }
    
    return (
        <div className="d-flex h-100">
            <Card className="d-flex flex-grow-1 me-1">
                <MapContainer id="map" />
            </Card>
            <Card className="w-25">
                <div className="d-flex flex-column mb-2">
                    <h5>Mode:</h5>
                    <ModeButton
                        mode={'single'}
                        currentMode={mode}
                        clickHandler={setModeHandler}>
                        single
                    </ModeButton>
                    <ModeButton
                        mode={'group'}
                        currentMode={mode}
                        clickHandler={setModeHandler}>
                        group
                    </ModeButton>
                    <ModeButton
                        mode={'group-alt'}
                        currentMode={mode}
                        clickHandler={setModeHandler}>
                        group-alt
                    </ModeButton>
                </div>
                <hr />
            </Card>
        </div>
    )
}

export default Map