import React from 'react'
import { Grid } from '@mui/material'

const Content = () => {
   return (
      <Grid item container xs={12}>
         <Grid item xs={12}>
            prova content
         </Grid>
      </Grid>
   )
}

export default React.memo(Content)
