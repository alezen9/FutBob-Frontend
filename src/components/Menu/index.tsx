import React from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import NavList from './NavList'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import ThemeSwitch from '../ThemeModeSwitch'
import { useConfigStore } from '@_zustand/configStore'

const useStyles = makeStyles(theme => ({
  relativeWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: (props: any) => props.menuOpen ? 250 : 60,
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
    maxWidth: (props: any) => props.menuOpen ? 250 : 60,
    overflow: 'hidden',
    transition: 'max-width .1s ease, background-color .1s ease',
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
    transform: (props: any) => props.menuOpen
      ? 'translate(0)'
      : 'translate(.7em, 3em)',
    transition: 'transform .1s ease',
    '@media(max-height: 450px)': {
      visibility: (props: any) => props.menuOpen ? 'visible' : 'hidden',
      pointerEvents: (props: any) => props.menuOpen ? 'all' : 'none'
    }
  }
}))

const Menu = () => {
  const { menuOpen, toggleMenu } = useConfigStore(state => ({
    menuOpen: state.menuOpen,
    toggleMenu: state.toggleMenu
  }))
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

export default React.memo(Menu)
