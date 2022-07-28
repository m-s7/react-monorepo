import { has, isEmpty } from 'lodash'
import { control, Control, Layer, Map } from 'leaflet'
import { CustomTypeDictionary } from '@ms7/common'

interface ControlManagerActions {
    showControl(): void,
    hideControl(): void,
    addLayerToControl(layer: Layer, group: string): void,
    removeLayerFromControl(group: string): void,
}

export const createControlManager = (map: Map): ControlManagerActions => {
    let controlLayer: Control.Layers
    const controlLayers: CustomTypeDictionary<Layer> = {}

    return {
        showControl() {
            controlLayer = control.layers(undefined, controlLayers).addTo(map)
        },
        hideControl() {
            if(controlLayer)
                map.removeControl(controlLayer)
        },
        addLayerToControl(layer: Layer, group) {
            controlLayers[group] = layer
        },
        removeLayerFromControl(group) {
            if(has(controlLayers, group))
                delete controlLayers[group]

            if(controlLayer)
                map.removeControl(controlLayer)
            
            if(!isEmpty(controlLayers))
                this.showControl()
        },
    }
}