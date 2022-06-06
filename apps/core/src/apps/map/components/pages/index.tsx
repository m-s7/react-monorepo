import React, { useEffect, useRef, useState } from 'react'
import BaseLink from '@/components/router/nav/base-link'
import 'leaflet/dist/leaflet.css'
import styles from 'Map/components/pages/index.module.css'
import { createMarker, IconColor } from 'Map/utils/leaflet-utils'
import { createMapManager, MapManager } from 'Map/business/map-manager'
import { LeafletMouseEvent, map } from 'leaflet'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card/card'

type MapMode = 'single' | 'group' | 'group-alt'

let mapManager: MapManager

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
        <Card>
            <p>{`MODE: ${mode}`}</p>
            <Button
                onClick={() => setMode('single')}
                className={'alert-warning'}>
                {'single'}
            </Button>
            <Button onClick={() => setMode('group')}>
                {'group'}
            </Button>
            <Button
                onClick={() => setMode('group-alt')}>
                {'group-alt'}
            </Button>
            <div
                id="map"
                className={styles.container} />
            <BaseLink
                to='/'
                text='Dashboard' />
        </Card>
    )
}

export default Map