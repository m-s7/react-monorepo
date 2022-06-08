import { has } from 'lodash'
import { BaseIconOptions, Icon, icon, LatLng, Marker, MarkerOptions } from 'leaflet'
import markerIconRed from 'Map/assets/images/leaflet/marker-icon-red.png'
import markerIconBlue from 'Map/assets/images/leaflet/marker-icon-blue.png'
import markerIconGreen from 'Map/assets/images/leaflet/marker-icon-green.png'
import markerRetinaIconRed from 'Map/assets/images/leaflet/marker-icon-2x-red.png'
import markerRetinaIconBlue from 'Map/assets/images/leaflet/marker-icon-2x-blue.png'
import markerRetinaIconGreen from 'Map/assets/images/leaflet/marker-icon-2x-green.png'
import markerShadowIcon from 'Map/assets/images/leaflet/marker-shadow.png'

export enum IconColor {
    RED, BLUE, GREEN
}

export const createMarker = (latlng: LatLng, options?: MarkerOptions, color?: IconColor): Marker => {
    if(!options)
        options = { icon: createIcon({}, color) }

    if(!has(options, 'icon'))
        options.icon = createIcon({}, color)

    return new Marker(latlng, options)
}

const createIcon = (options?: BaseIconOptions, color?: IconColor): Icon => icon({
    ...getIconsByColor(color),
    iconSize: options?.iconSize || [25, 41],
    shadowSize: options?.shadowSize || [41, 41],
    iconAnchor: options?.iconAnchor || [12, 42],
    shadowAnchor: options?.shadowAnchor || [12, 42],
    popupAnchor: options?.popupAnchor || [1, -34],
})

const getIconsByColor = (color?: IconColor): { shadowUrl: string, iconUrl: string, iconRetinaUrl: string } => {
    let icons
    
    switch(color) {
        case IconColor.RED:
            icons = { iconUrl: markerIconRed, iconRetinaUrl: markerRetinaIconRed }
            break
        case IconColor.GREEN:
            icons = { iconUrl: markerIconGreen, iconRetinaUrl: markerRetinaIconGreen }
            break
        case IconColor.BLUE:
        default:
            icons = { iconUrl: markerIconBlue, iconRetinaUrl: markerRetinaIconBlue }
    }
    
    return { shadowUrl: markerShadowIcon, ...icons }
}
