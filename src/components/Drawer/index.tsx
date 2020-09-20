import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

const useStyles = makeStyles(theme => ({
  list: {
    width: 400,
    padding: theme.spacing(2)
  }
}))

type Props = {
  open?: boolean
  toggleDrawer: VoidFunction
  content: any
}

const FutbobDrawer = (props: Props) => {
  const { open = false, toggleDrawer, content = <></> } = props
  const classes = useStyles()

  return (
    <Drawer anchor='right' open={open} onClose={toggleDrawer}>
      <div className={classes.list}>
        {content}
      </div>
    </Drawer>
  )
}

export default React.memo(FutbobDrawer)
