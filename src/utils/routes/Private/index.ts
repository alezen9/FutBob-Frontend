import { ZenRoute, ZenRouteID, ZenSection } from "../types";

export const privateRoutes: ZenRoute[] = [
   // ============================ //
   {
      _id: ZenRouteID.DASHBOARD,
      section: ZenSection.DASHBOARD,
      isPrivate: true,
      title: 'Dashboard',
      path: '/'
   },
    // ============================ //
   {
      _id: ZenRouteID.ME,
      section: ZenSection.ME,
      isPrivate: true,
      title: 'Profile',
      path: '/me'
   },
    // ============================ //
   {
      _id: ZenRouteID.PLAYERS,
      section: ZenSection.PLAYERS,
      isPrivate: true,
      title: 'Players',
      path: '/players'
   },
   {
      _id: ZenRouteID.PLAYER_CREATE,
      section: ZenSection.PLAYERS,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.PLAYERS,
      title: 'Create player',
      path: '/players/create'
   },
   {
      _id: ZenRouteID.PLAYER_DETAIL,
      section: ZenSection.PLAYERS,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.PLAYERS,
      title: 'Detail player',
      path: '/players/detail/:_id',
      as: ({ _id }) => `/players/detail/${_id}`
   },
    // ============================ //
   {
      _id: ZenRouteID.FREE_AGENTS,
      section: ZenSection.FREE_AGENTS,
      isPrivate: true,
      title: 'Free agents',
      path: '/free-agents'
   },
    // ============================ //
   {
      _id: ZenRouteID.FIELDS,
      section: ZenSection.FIELDS,
      isPrivate: true,
      title: 'Fields',
      path: '/fields'
   },
   {
      _id: ZenRouteID.FIELDS_CREATE,
      section: ZenSection.FIELDS,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.FIELDS,
      title: 'Create field',
      path: '/fields/create'
   },
   {
      _id: ZenRouteID.FIELDS_DETAIL,
      section: ZenSection.FIELDS,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.FIELDS,
      title: 'Detail field',
      path: '/fields/detail/:_id',
      as: ({ _id }) => `/fields/detail/${_id}`
   }
]