import React from 'react'
import { makeStyles, Switch } from '@material-ui/core'
import { FutBobPalette } from '../../../palette'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  rootCheckbox: {
    color: FutBobPalette.typographyGrey
  },
  track: {
    ...theme.type === 'dark' && {
      backgroundColor: 'rgba(255,255,255,.5)'
    }
  }
}))

const InputSwitch = ({ name, onChange, values }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Switch
        classes={{ root: classes.rootCheckbox, track: classes.track }}
        name={name}
        checked={values[name] || false}
        onChange={onChange}
        color='primary'
        margin='normal'
      />
    </div>
  )
}

export default React.memo(InputSwitch)
