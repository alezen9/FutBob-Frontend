import React from 'react'
import { Grid } from '@mui/material'

const TopComponent = () => {
   return (
      <Grid item container xs={12}>
         <Grid item xs={12}>
            Futbob
         </Grid>
      </Grid>
   )
}

export default React.memo(TopComponent)
