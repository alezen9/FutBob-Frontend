import React from 'react'
import DashboardWidget from '../../../components/DashboardWidget'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import CountUp from 'react-countup'

const useStyles = makeStyles(theme => ({
  main: {
    minHeight: 100,
    '& *': {
      color: '#fafafa'
    }
  }
}))

const TotaliContent = React.memo(props => {
  const { total = 0 } = props

  const classes = useStyles()
  return (
    <Grid container className={classes.main}>
      <Grid item xs={12}>
        {/* <Typography variant='body1'>Totale:</Typography> */}
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h1' align='right'>
          <CountUp end={total} />
        </Typography>
      </Grid>
    </Grid>
  )
})

const Totali = props => {
  return (
    <DashboardWidget
      {...props}
      content={<TotaliContent {...props} />}
    />
  )
}

export default React.memo(Totali)
