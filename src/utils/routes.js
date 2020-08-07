import React from 'react'
// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'
import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'
import SportsRoundedIcon from '@material-ui/icons/SportsRounded'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'

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
    icon: <PeopleAltRoundedIcon />,
    path: '/players'
  },
  {
    title: 'Matches',
    icon: <SportsSoccerRoundedIcon />,
    path: '/matches'
  }
]
