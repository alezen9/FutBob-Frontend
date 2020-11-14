import React, { ReactElement } from 'react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { routes, ZenRoute, ZenRouteID } from '@_utils/routes'
// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
// import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
// import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded'
import { FieldIcon, JerseyIcon } from '@_icons'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const iconMap = {
  [ZenRouteID.DASHBOARD]: <DashboardRoundedIcon />,
  [ZenRouteID.PROFILE]: <FaceRoundedIcon />,
  [ZenRouteID.PLAYERS]: <JerseyIcon />,
  [ZenRouteID.FIELDS]: <FieldIcon />
}

export type RouteItem = ZenRoute & {
   icon: ReactElement
}

const items: RouteItem[] = routes.map(route => ({
  ...route,
  icon: iconMap[route._id]
}))

const ZenMenu = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return isSmallScreen
    ? <MobileMenu items={items} />
    : <DesktopMenu items={items} />
}

export default React.memo(ZenMenu)
