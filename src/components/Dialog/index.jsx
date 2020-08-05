import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { IconButton, Typography, Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

const Transition = React.forwardRef((props, ref) => {
  return <Slide ref={ref} direction='left' {...props} />
})

const useStyles = makeStyles(theme => ({
  content: {
    height: ({ fullHeight }) => fullHeight ? '85vh' : 'auto',
    overflowY: 'auto'
  }
}))

const CustomDialog = props => {
  const {
    open,
    onClose,
    withTransition,
    title,
    content,
    actions,
    maxWidth = 'sm',
    fullHeight = false,
    overflowY = 'auto',
    fullScreen
  } = props
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles({ fullHeight })

  useLayoutEffect(() => {
    if (open && fullScreen && isSmallScreen) document.body.style.position = 'fixed'
    return () => {
      if (fullScreen && isSmallScreen) document.body.style.position = 'relative'
    }
  }, [open, fullScreen, isSmallScreen])

  return (
    <Dialog
      open={open}
      {...{ ...withTransition && { TransitionComponent: Transition } }}
      keepMounted={false}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen !== undefined ? fullScreen : isSmallScreen}
      maxWidth={maxWidth}
      aria-labelledby='details'
      aria-describedby='details'
    >
      {title && <DialogTitle id='alert-dialog-slide-title' >
        <Grid container spacing={3} justify='space-between'>
          <Grid item xs={10}>
            <Typography align='left' variant='h4'>{title}</Typography>
          </Grid>
          <Grid item align='right' style={{ padding: 0 }} xs={2}>
            <IconButton
              color='primary'
              onClick={onClose}
              aria-label='Close'>
              <CloseRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>}
      <DialogContent className={classes.content} style={{ overflowY }}>
        {content}
      </DialogContent>
      {actions && <DialogActions style={{ padding: '8px 24px', ...fullScreen && { padding: 24 } }}>{actions}</DialogActions>}
    </Dialog>
  )
}

CustomDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  withTransition: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.node,
  actions: PropTypes.node,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
}

export default React.memo(CustomDialog)
