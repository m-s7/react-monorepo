import { has, isEmpty } from 'lodash'
import { Map, LayerGroup, Marker } from 'leaflet'
import { CustomTypeDictionary } from '@ms7/common'

interface MarkerManagerActions {
    addMarker(marker: Marker, layerGroup: string): LayerGroup,
    addSingleMarker(marker: Marker): void,
    removeMarker(marker: Marker): string | undefined,
}

export const createMarkerManager = (map: Map, layerGroup: LayerGroup): MarkerManagerActions => {
    const markerLayerGroups: CustomTypeDictionary<LayerGroup> = {}

    let singleMarker: Marker

    return {
        addMarker(marker, group) {
            let markerLayerGroup = new LayerGroup()
            if(has(markerLayerGroups, group)) {
                const layerGroup = markerLayerGroups[group]
                layerGroup.removeLayer(layerGroup)
                markerLayerGroup = layerGroup
            }

            markerLayerGroup.addLayer(marker)
            markerLayerGroups[group] = markerLayerGroup

            layerGroup.addLayer(markerLayerGroup)

            // if(Object.keys(markerLayerGroup.getLayers()).length >= 2) {
            //     const a = markerLayerGroup.getLayers()
            //     const one = (a[0] as Marker)
            //     const two = (a[1] as Marker)
            //     const distance = one.getLatLng().distanceTo(two.getLatLng())
            //     if(distance < 1000)
            //         console.log(distance.toFixed(1) + 'm')
            //     else
            //         console.log((distance/1000).toFixed(1) + 'km')
            // }

            return markerLayerGroup
        },
        addSingleMarker(marker) {
            if(singleMarker)
                map.removeLayer(singleMarker)

            map.addLayer(marker)
            singleMarker = marker
        },
        removeMarker(marker) {
            if(marker === singleMarker) {
                map.removeLayer(singleMarker)

                return
            }

            for(const [group, layer] of Object.entries(markerLayerGroups)) {
                for(const search of layer.getLayers()) {
                    if(search === marker) {
                        layer.removeLayer(marker)

                        if(isEmpty(layer.getLayers()))
                            return group

                        break
                    }
                }
            }
        },
    }
}