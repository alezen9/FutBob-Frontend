import React, { useCallback, useState } from 'react'
import { Button, Drawer, Grid, makeStyles } from '@mui/material'
import ThemeSwitch from '@_components/ThemeModeSwitch'
import TopComponent from './TopComponent'
import Content from './Content'

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: '70vw'
  }
}))

const DrawerMenu = () => {
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = useState(false)

  const toggleDrawer = useCallback(() => {
    setOpenDrawer(state => !state)
  }, [])

  return (
      <>
        <div style={{ position: 'fixed' }}>
          <Button variant='outlined' color='secondary' onClick={toggleDrawer}>togle</Button>
        </div>
        <Drawer
          classes={{
            paper: classes.paper
          }}
          anchor='left'
          open={openDrawer}
          onClose={toggleDrawer}>
          <ThemeSwitch />
          <Grid container>
            <TopComponent />
            <Content />
          </Grid>
        </Drawer>
      </>
  )
}

export default DrawerMenu
