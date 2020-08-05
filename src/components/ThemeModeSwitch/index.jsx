import React, { useContext } from 'react'
import { makeStyles, Switch } from '@material-ui/core'
import { GlobalContextProvider } from '../../pages/_app'

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

const ThemeSwitch = props => {
  const { setTheme, themeType } = useContext(GlobalContextProvider)
  const classes = useStyles()
  return (
    <Switch
      classes={{
        thumb: classes.toggleThumb
      }}
      checked={themeType === 'dark'}
      color='primary'
      onChange={e => setTheme(themeType === 'light' ? 'dark' : 'light')} />
  )
}

export default ThemeSwitch
