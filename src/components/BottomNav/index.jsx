import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { typographyGrey } from '../../../lightTheme'
import { sections } from '../../utils/routes'
import { useRouter } from 'next/router'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { GlobalContextProvider } from '../../pages/_app'
import { apiInstance } from '../../SDK'

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
    color: typographyGrey,
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

const BottomNavbar = props => {
  const { setIsLogged } = useContext(GlobalContextProvider)
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/login')
  }, [])

  useEffect(() => {
    const active = sections.findIndex(({ path }) => path === router.pathname)
    setValue(active)
  }, [router])

  const afterLogout = () => {
    router.push('/login')
      .then(() => setIsLogged(false))
  }

  const logout = e => {
    e.preventDefault()
    apiInstance.user_logout(afterLogout)
  }

  const onItemClick = path => () => router.push(path)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
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
