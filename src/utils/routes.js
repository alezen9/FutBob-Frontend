import React from 'react'
// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
import { JerseyIcon } from '../assets/CustomIcon'

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
    title: 'Matches',
    icon: <SportsSoccerRoundedIcon />,
    path: '/matches'
  }
]
