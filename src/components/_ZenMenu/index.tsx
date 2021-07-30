import React, { ReactElement, useCallback } from 'react'
import { useMediaQuery, useTheme } from '@material-ui/core'
// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'
// import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded'
import { FieldIcon, FreeAgentIcon, JerseyIcon, FaceDynamicIcon } from '@_icons'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import { useRouter } from 'next/router'
import { useConfigStore } from '@_zustand/config'
import { apiInstance } from 'src/SDK'
import { ZenRoute, ZenRouteID, ZenSection } from '@_utils/routes/types'
import { routes, routesPaths } from '@_utils/routes'


const iconMap = {
   [ZenSection.DASHBOARD]: <DashboardRoundedIcon />,
   [ZenSection.ME]: <FaceDynamicIcon />,
   [ZenSection.PLAYERS]: <JerseyIcon />,
   [ZenSection.FREE_AGENTS]: <FreeAgentIcon />,
   [ZenSection.FIELDS]: <FieldIcon />,
   [ZenSection.APPOINTMENTS]: <SportsSoccerRoundedIcon />,
   // [ZenSection.STATISTICS]: <BarChartRoundedIcon />
}

export type RouteItem = ZenRoute & {
   icon: ReactElement
}

const items: RouteItem[] = routes.reduce((acc, route) => {
   if (route.section && route.isPrivate && route.isSectionEntryPoint && iconMap[route.section]) {
      acc.push({
         ...route,
         icon: iconMap[route.section]
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

   const afterLogout = useCallback(() => {
      setIsLogged(false)
      setIsLoading(false)
      router.push(routesPaths[ZenRouteID.LOGIN].path)
   }, [])

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
