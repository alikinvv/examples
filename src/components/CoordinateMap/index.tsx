import { FC, useRef } from 'react'
import { latLngBounds, Map as LeafletMap } from 'leaflet'
import L from 'leaflet'
import {
    FeatureGroup,
    Rectangle,
    MapContainer,
    TileLayer,
    Marker,
    useMap,
} from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import { CoordinateMapProps, LayerCreatedProps } from './types'
import { CoordinateMapStyled } from './styles'
import { useAppSelector } from 'hooks'
import 'leaflet-draw'
import './leaflet.css'
import './leaflet.draw.css'

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export const CoordinateMap: FC<CoordinateMapProps> = ({
    withoutControls = false,
    fullWidth = false,
    coordinates,
    onChangeCoordinates,
    mapCenter,
    withoutSquare = false,
}) => {
    const isMaxFigures =
        (Array.isArray(coordinates) && !!coordinates.length) ||
        (!Array.isArray(coordinates) && coordinates.hasOwnProperty('lat'))

    const drawOptions = {
        polyline: false,
        polygon: false,
        rectangle: withoutSquare || withoutControls ? false : true,
        circle: false,
        circlemarker: false,
        marker: withoutControls ? false : true,
    }

    const mapRef = useRef<LeafletMap>()

    const { companyId } = useAppSelector((state) => state.auth)
    const { companyList } = useAppSelector((state) => state.dictionary.company)

    const foo = (): [number, number] => {
        const companyCoordinates = companyList.find(
            (company) => company.companyId === companyId,
        )
        if (companyCoordinates?.latitude && companyCoordinates?.longitude) {
            return [companyCoordinates.latitude, companyCoordinates.longitude]
        }

        return [52.089416392013334, 35.85963249206544]
    }

    const createFigureHandler = (layer: LayerCreatedProps) => {
        switch (layer.layerType) {
            case 'rectangle': {
                onChangeCoordinates && onChangeCoordinates(layer.layer._latlngs)
                break
            }
            case 'marker': {
                onChangeCoordinates && onChangeCoordinates(layer.layer._latlng)
                break
            }
            default:
                break
        }
    }

    const SetViewOnClick = ({
        coordinates,
    }: {
        coordinates: [number, number]
    }) => {
        const map = useMap()
        map.setView(coordinates, map.getZoom())
        return null
    }

    return (
        <CoordinateMapStyled
            {...{ withoutSquare, withoutControls, isMaxFigures }}
        >
            <MapContainer
                zoom={16}
                center={foo()}
                style={{ height: 500, width: fullWidth ? '100%' : 800 }}
                whenCreated={(mapInstance) => {
                    mapRef.current = mapInstance
                }}
            >
                {mapCenter && <SetViewOnClick coordinates={mapCenter} />}
                <TileLayer
                    className="test"
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup>
                    <EditControl
                        onCreated={createFigureHandler}
                        onDeleted={() => {
                            onChangeCoordinates && onChangeCoordinates([])
                        }}
                        draw={drawOptions}
                        position="topright"
                    />
                    {coordinates && !Array.isArray(coordinates) && (
                        <Marker position={[coordinates.lat, coordinates.lng]} />
                    )}
                    {coordinates &&
                        Array.isArray(coordinates) &&
                        coordinates[0]?.length === 4 && (
                            <Rectangle bounds={latLngBounds(coordinates[0])} />
                        )}
                </FeatureGroup>
            </MapContainer>
        </CoordinateMapStyled>
    )
}
