import React, { useContext } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import NavList from './NavList'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { GlobalContextProvider } from '../../pages/_app'
import ThemeSwitch from '../ThemeModeSwitch'

const useStyles = makeStyles(theme => ({
  relativeWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: ({ menuOpen }) => menuOpen ? 250 : 60,
    overflow: 'hidden'
  },
  fixed: {
    position: 'fixed',
    display: 'flex',
    zIndex: 10,
    backgroundColor: theme.type === 'light'
      ? '#fafafa'
      : '#111',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: ({ menuOpen }) => menuOpen ? 250 : 60,
    overflow: 'hidden',
    transition: 'max-width .2s ease, background-color .3s ease',
    height: '100vh',
    padding: '0 1em',
    boxSizing: 'border-box',
    '&:before': {
      position: 'absolute',
      content: '""',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '85vh',
      width: '100%',
      borderRight: theme.type === 'light'
        ? '1px solid rgba(0,0,0,.1)'
        : '1px solid rgba(255,255,255,.1)'
    }
  },
  toggleMenu: {
    position: 'absolute',
    top: '.5em',
    left: 6
  },
  themeToggleClass: {
    position: 'absolute',
    top: '1em',
    right: '1em',
    transform: ({ menuOpen }) => menuOpen
      ? 'translate(0)'
      : 'translate(.7em, 3em)',
    transition: 'transform .1s ease',
    '@media(max-height: 450px)': {
      visibility: ({ menuOpen }) => menuOpen ? 'visible' : 'hidden',
      pointerEvents: ({ menuOpen }) => menuOpen ? 'all' : 'none'
    }
  }
}))

const Menu = () => {
  const { menuOpen, toggleMenu } = useContext(GlobalContextProvider)
  const classes = useStyles({ menuOpen })

  return (
    <div className={classes.relativeWrapper}>
      <div className={classes.fixed}>
        <IconButton
          className={classes.toggleMenu}
          onClick={toggleMenu}>
          {menuOpen
            ? <CloseRoundedIcon />
            : <MenuRoundedIcon />}
        </IconButton>
        <div className={classes.themeToggleClass}>
          <ThemeSwitch />
        </div>
        <NavList />
      </div>
    </div>
  )
}

export default Menu
