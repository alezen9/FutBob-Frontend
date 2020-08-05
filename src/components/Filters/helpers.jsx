import React, { useState, useRef, useEffect } from 'react'
import FormikInput from '../FomrikInput'
import { useTheme, useMediaQuery, Grid, Tooltip, IconButton, Button, Slide, makeStyles } from '@material-ui/core'
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded'

const useStyles = makeStyles(theme => ({
  slideCheck: {
    position: 'absolute',
    top: '25%',
    left: '40%'
  },
  exportBtnWrapper: {
    display: 'flex',
    alignItems: 'center',
    opacity: ({ checked }) => !checked ? 1 : 0,
    transition: ({ checked }) => `opacity ${checked ? 0.1 : 1}s ease`
  }
}))

export const Inputs = React.memo(({ filters, formik }) => filters.map((inputProps, i) => {
  const gridProps = filters.length > 2
    ? {
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
    : {}
  return <FormikInput
    key={i}
    xs={12}
    {...inputProps}
    {...gridProps}
    {...formik}
  />
}))

export const Actions = React.memo(({ formik, onExport, handleClose, desktopActions, toggleDrawer }) => {
  const [checked, setChecked] = useState(false)
  const classes = useStyles({ checked })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const tooSmallScreen = useMediaQuery('(max-width: 340px)')
  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleExport = () => {
    if (!checked) {
      onExport()
      temporaryCheck()
      if (handleClose || toggleDrawer) {
        if (isSmallScreen) {
          setTimeout(() => {
            if (isMounted.current) {
              if (handleClose) handleClose()
              if (toggleDrawer) toggleDrawer()
            }
          }, 200)
        } else {
          if (handleClose) handleClose()
          if (toggleDrawer) toggleDrawer()
        }
      }
    }
  }

  const temporaryCheck = () => {
    setChecked(true)
    setTimeout(() => {
      if (isMounted.current) setChecked(false)
    }, 1500)
  }

  const onSubmit = () => {
    formik.handleSubmit()
    if (handleClose) handleClose()
    if (toggleDrawer) toggleDrawer()
  }

  const onReset = () => {
    formik.resetForm({ values: formik.initialValues })
    onSubmit()
  }

  return <>
    {!(tooSmallScreen && onExport) && <Grid item>
      <Tooltip title='Reset filtri'>
        <IconButton
          style={{ width: 40, height: 40, padding: 10 }}
          onClick={onReset}
          color='primary'>
          <RotateLeftRoundedIcon />
        </IconButton>
      </Tooltip>
    </Grid>}
    {onExport && <Grid item>
      <Button
        onClick={handleExport}
        style={{ maxHeight: 40, overflow: 'hidden' }}
        variant='outlined'
        color='primary'>
            <>
              <Slide
                className={classes.slideCheck}
                direction='up'
                in={checked}
                mountOnEnter
                unmountOnExit>
                <DoneAllRoundedIcon />
              </Slide>
              <div className={classes.exportBtnWrapper}>
                {!isSmallScreen && <DescriptionRoundedIcon style={{ fontSize: '1.2em', marginRight: '.5em' }} />}
            Esporta
              </div>
            </>
      </Button>
    </Grid>}
    <Grid item>
      <Button
        onClick={onSubmit}
        style={{ maxHeight: 40, ...!desktopActions && { marginRight: isSmallScreen ? 0 : -24 } }}
        variant='contained'
        color='primary'>
            Applica
      </Button>
    </Grid>
  </>
})
