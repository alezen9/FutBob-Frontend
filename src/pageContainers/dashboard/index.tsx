import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

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

  return (
    <div className={classes.main}>
      <Typography className={classes.text} >It's gonna be lit!</Typography>
      {/* <img src='/assets/deadpool.png' className={classes.deadpool} /> */}
    </div>
  )
}

export default React.memo(DashboardContainer)
