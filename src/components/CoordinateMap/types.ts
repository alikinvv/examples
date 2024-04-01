import { Layer, LatLng, LatLngLiteral } from 'leaflet'

export interface CoordinateMapProps {
    coordinates: CoordProps | CoordProps[][]
    fullWidth?: boolean
    withoutControls?: boolean
    onChangeCoordinates?: (LatLng: CoordProps | CoordProps[][]) => void
    mapCenter?: [number, number]
    withoutSquare?: boolean
}

export type CoordProps = {
    lat: number
    lng: number
}

export interface LayerCreatedProps extends Layer {
    layer: Layer & {
        _latlngs: CoordProps[][]
        _latlng: CoordProps
        _radius: number
        _mRadius: number
        _leaflet_id: number
    }
    layerType:
        | 'polyline'
        | 'polygon'
        | 'rectangle'
        | 'circle'
        | 'marker'
        | 'none'
    id: number
}

export interface LayerEditProps extends Layer {
    layers: {
        _layers: {
            [id: number]: Layer & {
                _latlngs: LatLng[][]
                _latlng: LatLng
                _radius: number
                _mRadius: number
                _leaflet_id: number
                options: {
                    type:
                        | 'line'
                        | 'polyline'
                        | 'polygon'
                        | 'rectangle'
                        | 'circle'
                        | 'marker'
                        | 'none'
                    id: number
                }
            }
        }
    }
}
export interface FigureProps {
    latLngs?: LatLng[][]
    latLng?: LatLng | LatLngLiteral
}
