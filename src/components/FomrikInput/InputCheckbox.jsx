import React from 'react'
import { Checkbox, makeStyles } from '@material-ui/core'
import { FutBobPalette } from '../../../palette'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  rootCheckbox: {
    color: FutBobPalette.typographyGrey
  }
}))

const InputCheckbox = ({ name, onChange, values }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Checkbox
        classes={{ root: classes.rootCheckbox }}
        name={name}
        checked={values[name] || false}
        onChange={onChange}
        color='primary'
        margin='normal'
      />
    </div>
  )
}

export default React.memo(InputCheckbox)
