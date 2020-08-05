import React from 'react'
// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'
import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'

export const sections = [
  {
    title: 'Dashboard',
    icon: <DashboardRoundedIcon />,
    path: '/'
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
