import { LatLngExpression, LayerGroup, LeafletMouseEventHandlerFn, Map, Marker, tileLayer } from 'leaflet'
import { createMarkerManager } from 'Map/business/map/marker/marker-manager'
import { createControlManager } from 'Map/business/map/control/control-manager'

export interface MapManager {
    addMarker(marker: Marker, group: string): void,
    addSingleMarker(marker: Marker): void,
    removeMarker(marker: Marker): void,
    on(type: 'click', fn: LeafletMouseEventHandlerFn): void,
    off(type: 'click', fn?: LeafletMouseEventHandlerFn): void,
    destroy(): void,
}

export const createMapManager = (map: Map, center: LatLngExpression = [0, 0], zoom = 15): MapManager => {
    const layerGroup = new LayerGroup()
    const markerManager = createMarkerManager(map, layerGroup)
    const controlManager = createControlManager(map)

    map.setView(center, zoom)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    map.addLayer(layerGroup)

    return {
        addMarker(marker, group) {
            controlManager.hideControl()
            controlManager.addLayerToControl(markerManager.addMarker(marker, group), group)
            controlManager.showControl()
        },
        addSingleMarker(marker) {
            markerManager.addSingleMarker(marker)
        },
        removeMarker(marker) {
            const emptyGroupToRemove = markerManager.removeMarker(marker)
            if(emptyGroupToRemove)
                controlManager.removeLayerFromControl(emptyGroupToRemove)
        },
        on: (type, fn) => {
            map.on(type, fn)
        },
        off(type, fn?) {
            map.off(type, fn)
        },
        destroy() {
            map.remove()
        },
    }
}