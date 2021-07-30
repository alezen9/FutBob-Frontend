import { ZenRoute, ZenRouteID, ZenSection } from "../types";

export const privateRoutes: ZenRoute[] = [
   // ============================ //
   {
      _id: ZenRouteID.DASHBOARD,
      section: ZenSection.DASHBOARD,
      isSectionEntryPoint: true,
      isPrivate: true,
      title: 'Dashboard',
      path: '/'
   },
   // ============================ //
   {
      _id: ZenRouteID.ME,
      section: ZenSection.ME,
      isSectionEntryPoint: true,
      isPrivate: true,
      title: 'Me',
      path: '/me'
   },
   // ============================ //
   {
      _id: ZenRouteID.PLAYERS,
      section: ZenSection.PLAYERS,
      isSectionEntryPoint: true,
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
      path: '/players/detail/[_id]',
      as: ({ _id }) => `/players/detail/${_id}`
   },
   // ============================ //
   {
      _id: ZenRouteID.FREE_AGENTS,
      section: ZenSection.FREE_AGENTS,
      isSectionEntryPoint: true,
      isPrivate: true,
      title: 'Free agents',
      path: '/free-agents'
   },
   {
      _id: ZenRouteID.FREE_AGENT_REGISTER_PLAYER,
      section: ZenSection.FREE_AGENTS,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.FREE_AGENTS,
      title: 'Register free agent',
      path: '/free-agents/register-player/[_id]',
      as: ({ _id }) => `/free-agents/register-player/${_id}`
   },
   // ============================ //
   {
      _id: ZenRouteID.FIELDS,
      section: ZenSection.FIELDS,
      isSectionEntryPoint: true,
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
      path: '/fields/detail/[_id]',
      as: ({ _id }) => `/fields/detail/${_id}`
   },
      // ============================ //
   {
      _id: ZenRouteID.APPOINTMENTS,
      section: ZenSection.APPOINTMENTS,
      isSectionEntryPoint: true,
      isPrivate: true,
      title: 'Appointments',
      path: '/appointments'
   },
   {
      _id: ZenRouteID.APPOINTMENT_CREATE,
      section: ZenSection.APPOINTMENTS,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.APPOINTMENTS,
      title: 'Create Appointment',
      path: '/appointments/create'
   },
   {
      _id: ZenRouteID.APPOINTMENT_DETAIL,
      section: ZenSection.APPOINTMENTS,
      isPrivate: true,
      displayBack: true,
      backRouteID: ZenRouteID.APPOINTMENTS,
      title: 'Detail Appointment',
      path: '/appointments/detail/[_id]',
      as: ({ _id }) => `/appointments/detail/${_id}`
   },
   // ============================ //
]