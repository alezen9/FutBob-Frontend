export enum ZenRouteID {
   DASHBOARD = 'DASHBOARD',
   PROFILE = 'PROFILE',
   PLAYERS = 'PLAYERS',
   FREE_AGENT = 'FREE_AGENT',
   FIELDS = 'FIELDS',
   APPOINTMENTS = 'APPOINTMENTS',
   STATISTICS = 'STATISTICS'
}

export type ZenSubRoute = {
   title: string,
   path: string
}

export type ZenRoute = {
   _id: string
   title: string
   path: string
   subpaths?: ZenSubRoute[]
}

export const routes: ZenRoute[] = [
   {
      _id: ZenRouteID.DASHBOARD,
      title: 'Dashboard',
      path: '/'
   },
   {
      _id: ZenRouteID.PROFILE,
      title: 'Profile',
      path: '/profile'
   },
   {
      _id: ZenRouteID.PLAYERS,
      title: 'Players',
      path: '/players?page=1'
   },
   // {
   //    _id: ZenRouteID.FREE_AGENT,
   //    title: 'Free agent',
   //    path: '/players?page=1'
   // },
   {
      _id: ZenRouteID.FIELDS,
      title: 'Fields',
      path: '/fields?page=1'
   },
//    {
//       _id: ZenRouteID.APPOINTMENTS,
//       title: 'Appointments',
//       path: '/fields?page=1'
//    },
//   {
//       _id: ZenRouteID.STATISTICS,
//       title: 'Statistics',
//       path: '/players?page=1'
//   }
]
