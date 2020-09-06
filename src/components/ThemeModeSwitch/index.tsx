import React, { useCallback } from 'react'
import { makeStyles, Switch } from '@material-ui/core'
import { useConfigStore } from '../../zustand/configStore'
import { ThemeType } from '../../../palette'

const useStyles = makeStyles(theme => ({
  toggleThumb: {
    position: 'relative',
    '&:after': {
      opacity: theme.type === 'light'
        ? 0
        : 1,
      transition: 'opacity .2s ease',
      position: 'absolute',
      top: '-.2em',
      left: '.25em',
      clipPath: 'circle(17px at bottom left)',
      width: '100%',
      height: '100%',
      content: '""',
      borderRadius: '50%',
      backgroundColor: '#111'
    }
  }
}))

const ThemeSwitch = () => {
  const { setTheme, themeType } = useConfigStore(state => ({
    themeType: state.themeType,
    setTheme: state.setTheme
  }))
  const classes = useStyles()

  const toggleTheme = useCallback(() => {
    setTheme(themeType === ThemeType.light
      ? ThemeType.dark
      : ThemeType.light)
  }, [setTheme, themeType])

  return (
    <Switch
      classes={{ thumb: classes.toggleThumb }}
      checked={themeType === 'dark'}
      color='primary'
      onChange={toggleTheme} />
  )
}

export default React.memo(ThemeSwitch)
