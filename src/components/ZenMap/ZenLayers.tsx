import { useConfigStore } from '@_zustand/config'
import { MapLayer } from '@_zustand/config/helpers'
import { LayersControlEvent } from 'leaflet'
import React, { useCallback, useRef } from 'react'
import { LayersControl, TileLayer, useMapEvent } from 'react-leaflet'

const ZenLayers = () => {
  const { activeMapLayer, setActiveMapLayer } = useConfigStore(state => ({
    activeMapLayer: state.activeMapLayer,
    setActiveMapLayer: state.setActiveMapLayer
  }))

  const selectLayer = useCallback((e: LayersControlEvent) => {
    setActiveMapLayer(e.name as MapLayer)
  }, [setActiveMapLayer])

  useMapEvent('baselayerchange', selectLayer)

  return (
    <LayersControl position='topright'>
      <LayersControl.BaseLayer checked={activeMapLayer === MapLayer.Normal} name={MapLayer.Normal}>
        <TileLayer
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer checked={activeMapLayer === MapLayer.Satellite} name={MapLayer.Satellite}>
        <TileLayer
          attribution='Tiles © Esri - Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          subdomains='abcd'
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer checked={activeMapLayer === MapLayer.Light} name={MapLayer.Light}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          subdomains='abcd'
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer checked={activeMapLayer === MapLayer.Dark} name={MapLayer.Dark}>
        <TileLayer
          attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          maxZoom={20}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  )
}

export default React.memo(ZenLayers)
