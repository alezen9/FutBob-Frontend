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
      _id: ZenRouteID.PROFILE,
      section: ZenSection.PROFILE,
      isPrivate: true,
      title: 'Profile',
      path: '/profile'
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
      title: 'Create player',
      path: '/players/create'
   },
   {
      _id: ZenRouteID.PLAYER_EDIT,
      section: ZenSection.PLAYERS,
      isPrivate: true,
      title: 'Edit player',
      path: '/players/edit/:_id'
   },
    // ============================ //
   {
      _id: ZenRouteID.FREE_AGENTS,
      section: ZenSection.FREE_AGENTS,
      isPrivate: true,
      title: 'Free agent',
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
      title: 'Create field',
      path: '/fields/create'
   },
   {
      _id: ZenRouteID.FIELDS_EDIT,
      section: ZenSection.FIELDS,
      isPrivate: true,
      title: 'Edit player',
      path: '/fields/edit/:_id'
   }
]