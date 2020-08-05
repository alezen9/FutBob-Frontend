import React from 'react'
import { Typography, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3)
  },
  main: {
    borderRadius: 5,
    backgroundColor: ({ color }) => color || theme.palette.primary.main,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[7],
    color: '#fafafa',
    height: '100%'
  },
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    color: '#fafafa'
  }
}))

const DashboardWidget = props => {
  const { title = 'Widget', xs = 12, sm = 6, color, titleStyles = {}, content, ...rest } = props
  const classes = useStyles({ color })
  return (
    <Grid item xs={xs} sm={sm} className={classes.container} {...rest}>
      <Grid container className={classes.main}>
        <Grid item xs={12}>
          <Typography variant='h4' className={classes.title} style={titleStyles}>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          {content || <></>}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DashboardWidget
