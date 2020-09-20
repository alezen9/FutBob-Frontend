import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, List, ListItemIcon, ListItem, ListItemText, Collapse } from '@material-ui/core'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import { compact, take } from 'lodash'
import { useRouter } from 'next/router'
import { sections, Section } from '../../utils/routes'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { apiInstance } from '../../SDK'
import { FutBobPalette } from '../../../palette'
import { useConfigStore } from '../../zustand/configStore'

const useStyles = makeStyles({
  root: {},
  nested: {},
  subpaths: {},
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

type SubPathsItemProps = Section & {
  handleRoute: (path: string) => (e?: any) => void | Promise<void>
}

type ItemProps = SubPathsItemProps & {
  iconStaticProps?: any
  ignoreActiveProps?: boolean
}

const buildSubPath = (mainPath: string, subPath: string): string => {
  const subPaths = compact(subPath.split('/'))
  return mainPath
    .split('/')
    .map(el => el.startsWith(':') ? take(subPaths) : el)
    .join('/')
}

const checkActivePage = (currentPath: string, itemPath: string): boolean => {
  if (currentPath === '/') return itemPath === '/'
  const [_, ...str] = itemPath
  const exp = `^\\/${str.length ? '+' : '+dashboard'}${str.join('')}`
  const testPath = new RegExp(exp)
  return testPath.test(currentPath)
}

const SingleItemList = (props: ItemProps) => {
  const { handleRoute, icon, title, path, iconStaticProps = {}, ignoreActiveProps = false } = props
  const router = useRouter()

  const activeProps = ignoreActiveProps
    ? {}
    : { ...checkActivePage(router.pathname, path) && { color: 'primary' } }
  const classes = useStyles()
  return <ListItem className={classes.listItem} button onClick={handleRoute(path)}>
    <ListItemIcon {...iconStaticProps}>
      {React.cloneElement(icon, activeProps)}
    </ListItemIcon>
    <ListItemText primaryTypographyProps={{ ...activeProps }} primary={title} />
  </ListItem>
}

const ExpandableItemList = (props: SubPathsItemProps) => {
  const { handleRoute, icon, title, path: mainPath, subpaths } = props
  const [openMore, setOpenMore] = useState(false)
  const classes = useStyles()

  const handleClick = useCallback(
    () => {
      setOpenMore(state => !state)
    }, [])

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

const NavList = () => {
  const router = useRouter()
  const setIsLogged = useConfigStore(state => state.setIsLogged)
  const classes = useStyles()

  useEffect(() => {
    router.prefetch('/login')
  }, [])

  const handleRoute = useCallback(path => async () => {
    await router.push(path)
  }, [router])

  const afterLogout = useCallback(
    async () => {
    await router.push('/login')
    setIsLogged(false)
  },[router])

  const logout = useCallback(
    (path: string) => (e: Event) => {
    e.preventDefault()
    apiInstance.user_logout(afterLogout)
  }, [])

  const routeBuilder = () => {
    return sections.map((section: Section, i: number) => {
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
