import React from 'react'
import { Grid } from '@material-ui/core'

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
