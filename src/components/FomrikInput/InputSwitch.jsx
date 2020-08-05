import React from 'react'
import { makeStyles, Switch } from '@material-ui/core'
import { typographyGrey as typographyGreyDark } from '../../../darkTheme'
import { typographyGrey as typographyGreyLight } from '../../../lightTheme'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  rootCheckbox: {
    color: theme.type === 'dark'
      ? typographyGreyDark
      : typographyGreyLight
  }
}))

const InputCheckbox = ({ name, onChange, values }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Switch
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
