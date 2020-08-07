import React, { useState, useEffect } from 'react'
import { makeStyles, List, ListItemIcon, ListItem, ListItemText, Collapse } from '@material-ui/core'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import { compact, take } from 'lodash'
import { useRouter } from 'next/router'
import { sections } from '../../utils/routes'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { apiInstance } from '../../SDK'
import { FutBobPalette } from '../../../palette'
import { useConfigStore } from '../../zustand/stores'

const useStyles = makeStyles({
  list: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  subheader: {
    display: 'flex',
    height: '4rem',
    alignItems: 'center',
    '&> img': {
      height: '2rem'
    }
  },
  listItem: {
    height: '4rem'
  },
  logout: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
})

const buildSubPath = (mainPath, subPath) => {
  const subPaths = compact(subPath.split('/'))
  return mainPath
    .split('/')
    .map(el => el.startsWith(':') ? take(subPaths) : el)
    .join('/')
}
const SingleItemList = props => {
  const { handleRoute, icon, title, path, iconStaticProps = {}, ignoreActiveProps = false } = props
  const router = useRouter()
  const activeProps = ignoreActiveProps
    ? {}
    : { ...router.pathname === path && { color: 'primary' } }
  const classes = useStyles()
  return <ListItem className={classes.listItem} button onClick={handleRoute(path)}>
    <ListItemIcon {...iconStaticProps}>
      {React.cloneElement(icon, activeProps)}
    </ListItemIcon>
    <ListItemText primaryTypographyProps={{ ...activeProps }} primary={title} />
  </ListItem>
}

const ExpandableItemList = props => {
  const { handleRoute, icon, title, path: mainPath, subpaths } = props
  const [openMore, setOpenMore] = useState(false)
  const classes = useStyles()

  const handleClick = () => {
    setOpenMore(state => !state)
  }

  return <>
    <ListItem className={classes.listItem} button onClick={handleClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
      {openMore ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
    </ListItem>
    <Collapse in={openMore} timeout='auto' unmountOnExit>
      <List component='div' disablePadding>
        {subpaths.map(({ path, title: titleSubEl }, i) => {
          const route = buildSubPath(mainPath, path)
          return <ListItem key={`subpath-${i}`} button className={classes.nested} onClick={handleRoute(route)}>
            <ListItemIcon>
              <KeyboardArrowRightRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={titleSubEl} />
          </ListItem>
        })}
      </List>
    </Collapse>
</>
}

const NavList = props => {
  const router = useRouter()
  const setIsLogged = useConfigStore(state => state.setIsLogged)
  const classes = useStyles()

  useEffect(() => {
    router.prefetch('/login')
  }, [])

  const handleRoute = path => e => router.push(path)

  const afterLogout = () => {
    router.push('/login')
      .then(() => setIsLogged(false))
  }

  const logout = path => e => {
    e.preventDefault()
    apiInstance.user_logout(afterLogout)
  }

  const routeBuilder = () => {
    return sections.map((section, i) => {
      return !section.subpaths
        ? <SingleItemList key={`main-path-${i}`} {...{ ...section, handleRoute }} />
        : <ExpandableItemList key={`main-path-${i}`} {...{ ...section, handleRoute }} />
    })
  }

  return (
    <>
      <div className={classes.list} >
        <List className={classes.root}>
          {routeBuilder()}
        </List>
      </div>
      <div className={classes.logout}>
        <SingleItemList
          handleRoute={logout}
          path='/login'
          icon={<ExitToAppRoundedIcon />}
          title='Logout'
          iconStaticProps={{ style: { color: FutBobPalette.lightRed, opacity: 0.7 } }}
          ignoreActiveProps
        />
      </div>
        </>
  )
}

export default React.memo(NavList)
