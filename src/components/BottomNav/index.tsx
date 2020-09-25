import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { sections } from '../../utils/routes'
import { useRouter } from 'next/router'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { apiInstance } from '../../SDK'
import { FutBobPalette } from '../../../palette'
import { useConfigStore } from '@_zustand/configStore'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    height: 80,
    backgroundColor: theme.type === 'light'
      ? '#fafafa'
      : '#111',
    borderTop: theme.type === 'light'
      ? '1px solid rgba(0,0,0,.1)'
      : '1px solid rgba(255,255,255,.2)',
    alignItems: 'baseline',
    zIndex: 1
  },
  actionRoot: {
    minWidth: 30,
    maxWidth: 65
  },
  iconOnly: {
    marginTop: '1em',
    paddingTop: '0 !important',
    '@media (max-width:350px)': {
      minWidth: 'unset'
    },
    color: FutBobPalette.typographyGrey,
    '& svg': {
      fontSize: '1.7rem',
      '@media (max-width:350px)': {
        fontSize: '1.3rem'
      }
    }
  },
  selected: {
    marginTop: '1em',
    paddingTop: '0 !important',
    '@media (max-width:350px)': {
      minWidth: 'unset'
    },
    color: theme.palette.primary.main,
    '& svg': {
      fontSize: '1.7rem',
      '@media (max-width:350px)': {
        fontSize: '1.3rem'
      }
    }
  }
}))

const BottomNavbar = () => {
  const setIsLogged = useConfigStore(state => state.setIsLogged)
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/login')
  }, [router])

  useEffect(() => {
    const active = sections.findIndex(({ path }) => path === router.pathname)
    setValue(active)
  }, [router])

  const afterLogout = useCallback(
    async () => {
    await router.push('/login')
    setIsLogged(false)
  }, [router])

  const logout = useCallback(
    (e: any) => {
      e.preventDefault()
      apiInstance.user_logout(afterLogout)
  }, [])

  const onItemClick = useCallback(path => async () => await router.push(path), [router])

  const onChange = useCallback((e: any, newVal: number) => setValue(newVal), [])

  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      className={classes.root}
    >
      {sections.map((item, i) => <BottomNavigationAction
        {...{
          key: `bottom-item-${i}`,
          classes: { root: classes.actionRoot, iconOnly: classes.iconOnly, selected: classes.selected },
          icon: item.icon,
          disableRipple: true,
          onClick: onItemClick(item.path),
          ...item
        }}
      />)}
      <BottomNavigationAction
        {...{
          key: `bottom-item-logout`,
          classes: { root: classes.actionRoot, iconOnly: classes.iconOnly, selected: classes.selected },
          icon: <ExitToAppRoundedIcon />,
          disableRipple: true,
          onClick: logout
        }}
      />
    </BottomNavigation>
  )
}

export default React.memo(BottomNavbar)
