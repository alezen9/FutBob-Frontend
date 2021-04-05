import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  main: {
    width: '100%',
    height: '100%'
  }
})

const Placeholder = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.main} justify='center' alignItems='center'>
      <Grid item>
            prova
      </Grid>
    </Grid>
  )
}

export default Placeholder
