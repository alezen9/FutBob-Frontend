export enum ZenRouteID {
   LOGIN = 'LOGIN',
   REGISTER = 'REGISTER',
   CONFIRM_REGISTRATION = 'CONFIRM_REGISTRATION',
   DASHBOARD = 'DASHBOARD',
   PROFILE = 'PROFILE',
   PLAYERS = 'PLAYERS',
   PLAYER_CREATE = 'PLAYER_CREATE',
   PLAYER_EDIT = 'PLAYER_EDIT',
   FREE_AGENTS = 'FREE_AGENTS',
   FIELDS = 'FIELDS',
   FIELDS_CREATE = 'FIELDS_CREATE',
   FIELDS_EDIT = 'FIELDS_EDIT'
   // APPOINTMENTS = 'APPOINTMENTS',
   // STATISTICS = 'STATISTICS'
}

export enum ZenSection {
   DASHBOARD = 'DASHBOARD',
   PROFILE = 'PROFILE',
   PLAYERS = 'PLAYERS',
   FREE_AGENTS = 'FREE_AGENTS',
   FIELDS = 'FIELDS'
   // APPOINTMENTS = 'APPOINTMENTS',
   // STATISTICS = 'STATISTICS'
}

export type ZenSubRoute = {
   title: string
   path: string
}

export type ZenRoute = {
   _id: string
   title: string
   path: string
   isPrivate: boolean
   section?: ZenSection
   subpaths?: ZenSubRoute[]
}