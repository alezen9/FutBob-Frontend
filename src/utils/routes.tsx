import React from 'react'
// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded'
import { JerseyIcon, FieldIcon } from '../assets/CustomIcon'

export const sections = [
  {
    title: 'Dashboard',
    icon: <DashboardRoundedIcon />,
    path: '/'
  },
  {
    title: 'Profile',
    icon: <FaceRoundedIcon />,
    path: '/profile'
  },
  {
    title: 'Players',
    icon: <JerseyIcon />,
    path: '/players'
  },
  {
    title: 'Fields',
    icon: <FieldIcon />,
    path: '/fields'
  },
  {
    title: 'Matches',
    icon: <SportsSoccerRoundedIcon />,
    path: '/matches'
  },
  {
    title: 'Stats',
    icon: <BarChartRoundedIcon />,
    path: '/statistics'
  }
]
