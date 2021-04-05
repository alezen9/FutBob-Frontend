import React, { ReactElement, useState } from 'react'
import { MapContainer, MapContainerProps } from 'react-leaflet'
import L from 'leaflet'
import Placeholder from './Placeholder'
import ZenMarker, { ZenMarkerProps } from './ZenMarker'
import ZenLayers from './ZenLayers'

export const MAP_INIT_CENTER: L.LatLngExpression = [44.78322861998426, 10.093077421188356]
const MAP_INIT_ZOOM: number = 4

type Props = {
  mapContainerProps?: Partial<Omit<MapContainerProps, 'whenCreated'>>
  markers?: ZenMarkerProps[]
}

const ZenMap: React.FC<Props> = ({ mapContainerProps = {}, markers = [] }) => {
  const [map, setMap] = useState<L.Map>(null)

  return (
    <MapContainer
      whenCreated={setMap}
      style={{ position: 'relative', height: 500, width: 500 }}
      center={MAP_INIT_CENTER}
      zoom={MAP_INIT_ZOOM}
      placeholder={<Placeholder />}
      scrollWheelZoom
      {...mapContainerProps}>
      <ZenLayers />
      {markers.map((markerProps, i) => {
        return <ZenMarker key={`marker-${i}`} {...{ ...markerProps, position: markerProps.position || MAP_INIT_CENTER }} />
      })}
    </MapContainer>
  )
}

export default ZenMap
