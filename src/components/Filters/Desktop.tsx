import React, { useState } from 'react'
import { Grid, Button, makeStyles, IconButton } from '@material-ui/core'
import { Actions, Inputs, SearchBox } from './helpers'
import CondexoDrawer from '../Drawer'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'

const useStyles = makeStyles(theme => ({
  '@keyframes animateOpacity': {
    '0%': { opacity: 0 },
    '70%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  desktopFiltersButton: {
    position: 'absolute',
    top: '-3em',
    right: '.5em',
    opacity: 0
  },
  opacityFix: {
    opacity: 0,
    animation: '$animateOpacity 1s forwards'
  }
}))

const DesktopFilters = props => {
  const { actionsGridProps = {}, desktopActions, filters = [], otherActions = [], searchBox } = props
  const [openDrawer, setOpenDrawer] = useState(false)
  const classes = useStyles()

  const toggleDrawer = () => setOpenDrawer(state => !state)

  return (
    <Grid container spacing={3} style={{ position: 'relative' }}>
      {searchBox && <SearchBox {...searchBox} />}
      {filters.length > 2
        ? <>
          <Grid container item xs={12} spacing={2} direction='row-reverse' className={`${classes.desktopFiltersButton} ${classes.opacityFix}`}>
            <IconButton onClick={toggleDrawer}>
              <FilterListRoundedIcon />
            </IconButton>
            {otherActions}
          </Grid>
          <CondexoDrawer
            open={openDrawer}
            toggleDrawer={toggleDrawer}
            content={<Grid container spacing={3}>
              <Inputs {...props} />
              <Grid
                item
                xs={12}
                container
                spacing={3}
                justify='flex-end'
                alignItems='flex-start'
                style={{ marginTop: 12 }}
                {...actionsGridProps}
              >
                <Actions {...props} toggleDrawer={toggleDrawer} />
                {desktopActions && desktopActions}
              </Grid>
            </Grid>}
          />
      </>
        : <>
          <Inputs {...props} />
          <Grid
            item
            xs={12}
            sm={6}
            container
            spacing={3}
            justify='flex-end'
            alignItems='flex-start'
            style={{ marginTop: 12 }}
            {...actionsGridProps}
          >
            <Actions {...props} />
            {desktopActions && desktopActions}
          </Grid>
      </>}
    </Grid>
  )
}

export default React.memo(DesktopFilters)
