import React, { useRef, useEffect } from 'react'
import FormikInput from '../FormikInput'
import { useTheme, useMediaQuery, Grid, Tooltip, IconButton, Button, InputAdornment } from '@material-ui/core'
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded'
import { useFormik } from 'formik'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'

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
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const tooSmallScreen = useMediaQuery('(max-width: 340px)')
  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

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
      <Tooltip title='Reset filters'>
        <IconButton
          style={{ width: 40, height: 40, padding: 10 }}
          onClick={onReset}
          color='primary'>
          <RotateLeftRoundedIcon />
        </IconButton>
      </Tooltip>
    </Grid>}
    <Grid item>
      <Button
        onClick={onSubmit}
        style={{ maxHeight: 40, ...!desktopActions && { marginRight: isSmallScreen ? 0 : -24 } }}
        variant='contained'
        color='primary'>
          Apply filters
      </Button>
    </Grid>
  </>
})

const SearchAdornment = () => <InputAdornment position='end' >
  <SearchRoundedIcon />
</InputAdornment>

export const SearchBox = React.memo(props => {
  const { onTextChange, ...rest } = props

  const formik = useFormik({
    initialValues: { searchText: '' },
    onSubmit: onTextChange
  })

  return (
    <FormikInput
      xs={12}
      sm={6}
      name='searchText'
      label='Search'
      inputProps={{
        endAdornment: <SearchAdornment />
      }}
      supplementaryOnChange={onTextChange}
      {...formik}
      {...rest}
    />
  )
})
