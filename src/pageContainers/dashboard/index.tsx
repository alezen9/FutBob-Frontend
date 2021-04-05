import React, { useCallback, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import dynamic from 'next/dynamic'
import ZenMarker from '@_components/ZenMap/ZenMarker'
const ZenMap = dynamic(() => import('@_components/ZenMap'), { ssr: false })

const useStyles = makeStyles(theme => ({
   main: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '85vh',
      marginTop: '1em'
   },
   deadpool: {
      maxWidth: '70%',
      position: 'absolute',
      bottom: '-10vh',
      right: 0
   },
   text: {
      fontSize: '5em',
      fontWeight: 'bold'
   }
}))

const DashboardContainer = props => {
   const classes = useStyles()
   const [position, setPosition] = useState(null)

   const onDragEnd = useCallback((coordinates: L.LatLng) => {
      console.log(coordinates)
   }, [])

   return (
      <div className={classes.main}>
         {/* <Typography className={classes.text} >It's gonna be lit!</Typography> */}
         <ZenMap
            markers={[
               {
                  position,
                  onDragEnd,
                  popupContent: 'Aleks'
               }
            ]}
         />
      </div>
   )
}

export default React.memo(DashboardContainer)
