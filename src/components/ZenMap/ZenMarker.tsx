import React, { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ZenPalette } from '@_MUITheme'
import { makeStyles } from '@material-ui/core'
import RoomSharpIcon from '@material-ui/icons/RoomSharp'
import ReactDOMServer from 'react-dom/server'


const useStyles = makeStyles(theme => ({
   markerIconContainer: {
      background: 'unset'
   },
   markerIcon: {
      width: 55,
      height: 55,
      color: '#ff4d4d',
      cursor: 'move',
      stroke: 'rgba(0,0,0,.4)',
      strokeWidth: 1
   },
   popup: {
      '& > div': {
         color: ZenPalette.typographyGrey,
      },
      '& > div:first-of-type': {
         background: ZenPalette.paperBackgroundColor
      },
      '& > div:nth-of-type(2) > div': {
         background: ZenPalette.paperBackgroundColor
      }
   }
}))

export type ZenMarkerProps = {
   position: L.LatLngExpression
   popupContent?: ReactNode
   onDragEnd?: (coordinates: L.LatLng) => void
}

const ZenMarker = React.memo<ZenMarkerProps>(props => {
   const { position, popupContent, onDragEnd } = props
   const classes = useStyles()
   const ref = useRef<L.Marker>(null)
   const icon = useMemo(() => {
      return L.divIcon({
         className: classes.markerIconContainer,
         html: ReactDOMServer.renderToStaticMarkup(<RoomSharpIcon className={classes.markerIcon} />),
         iconSize: [55, 55],
         iconAnchor: [22.5, 55],
         popupAnchor: [6, -40]
      })
   }, [classes.markerIconContainer, classes.markerIcon])

   const dragend = useCallback(() => {
      if (onDragEnd && ref.current) {
         onDragEnd(ref.current.getLatLng())
      }
   }, [onDragEnd])

   return <Marker
      ref={ref}
      draggable={!!onDragEnd}
      eventHandlers={{ dragend }}
      icon={icon}

      position={position}>
      {popupContent && <Popup closeButton={false} className={classes.popup}>
         {popupContent}
      </Popup>}
   </Marker>
})

export default React.memo(ZenMarker)