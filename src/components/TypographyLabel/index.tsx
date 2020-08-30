import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  labelClass: {
    mixBlendMode: 'exclusion',
    fontWeight: 'bold'
  }
}))

const TypographyLabel = props => {
  const { label = '', value = '', sm, valueStyle = {} } = props
  const classes = useStyles()

  return (
    <Grid item container xs={12} {...sm && { sm }}>
      <Grid item xs={12}>
        <Typography variant='caption' className={classes.labelClass}>{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='caption' style={valueStyle}>{value}</Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(TypographyLabel)
