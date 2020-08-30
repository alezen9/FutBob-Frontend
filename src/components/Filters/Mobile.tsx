import React, { useState, useRef } from 'react'
import { IconButton, makeStyles, Grid } from '@material-ui/core'
import CustomDialog from '../Dialog'
import { Inputs, Actions } from './helpers'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'

const useStyles = makeStyles(theme => ({
  '@keyframes animateOpacity': {
    '0%': { opacity: 0 },
    '70%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  mobileFiltersButton: {
    position: 'absolute',
    top: '.8em',
    right: '1em',
    opacity: 0
  },
  opacityFix: {
    opacity: 0,
    animation: '$animateOpacity 1s forwards'
  }
}))

const MobileFilters = props => {
  const { otherActions = [] } = props
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  const handleClose = () => setIsOpen(false)

  return <>
    <Grid container item xs={12} spacing={2} direction='row-reverse' className={`${classes.mobileFiltersButton} ${classes.opacityFix}`}>
      <IconButton onClick={handleOpen}>
        <FilterListRoundedIcon />
      </IconButton>
      {otherActions}
    </Grid>
    <CustomDialog
      open={isOpen}
      onClose={handleClose}
      fullScreen={false}
      maxWidth='xl'
      title='Filters'
      overflowY='hidden'
      content={<Inputs {...props} />}
      actions={<Actions {...props} handleClose={handleClose} />}
    />
  </>
}

export default React.memo(MobileFilters)
