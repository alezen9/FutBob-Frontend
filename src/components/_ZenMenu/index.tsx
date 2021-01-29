import React, { ReactElement, useCallback } from 'react'
import { useMediaQuery, useTheme } from '@material-ui/core'
// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
// import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
// import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded'
import { FieldIcon, FreeAgentIcon, JerseyIcon } from '@_icons'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import { useRouter } from 'next/router'
import { useConfigStore } from '@_zustand/config'
import { apiInstance } from 'src/SDK'
import { ZenRoute, ZenRouteID } from '@_utils/routes/types'
import { routes } from '@_utils/routes'

const iconMap = {
  [ZenRouteID.DASHBOARD]: <DashboardRoundedIcon />,
  [ZenRouteID.PROFILE]: <FaceRoundedIcon />,
  [ZenRouteID.PLAYERS]: <JerseyIcon />,
  [ZenRouteID.FREE_AGENTS]: <FreeAgentIcon />,
  [ZenRouteID.FIELDS]: <FieldIcon />,
//   [ZenRouteID.APPOINTMENTS]: <SportsSoccerRoundedIcon />,
//   [ZenRouteID.STATISTICS]: <BarChartRoundedIcon />
}

export type RouteItem = ZenRoute & {
   icon: ReactElement
}

const items: RouteItem[] = routes.reduce((acc, route) => {
  if(route.section && route.isPrivate && iconMap[route._id]){
     acc.push({
         ...route,
         icon: iconMap[route._id]
     })
  }
  return acc
}, [])

type voidFn = (e: any) => void

export type logoutFn = (open: boolean, toggleMenu: VoidFunction) => voidFn

const ZenMenu = () => {
   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
   const router = useRouter()
   const { setIsLogged, setIsLoading } = useConfigStore(state => ({
      setIsLogged: state.setIsLogged,
      setIsLoading: state.setIsLoading
   }))

   const afterLogout = useCallback(async () => {
      await router.push('/login')
      setIsLogged(false)
      setIsLoading(false)
   },[router])

   const logout = useCallback(
      (open: boolean, toggleMenu: VoidFunction) => (e: any) => {
         e.preventDefault()
         if (open) toggleMenu()
         apiInstance.auth.logout(afterLogout)
      }, [])

   return isSmallScreen
      ? <MobileMenu items={items} logout={logout} />
      : <DesktopMenu items={items} logout={logout} />
}

export default React.memo(ZenMenu)
