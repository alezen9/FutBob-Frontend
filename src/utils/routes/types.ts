export enum ZenRouteID {
   ERROR = 'ERROR',
   LOGIN = 'LOGIN',
   REQUEST_ACCOUNT = 'REQUEST_ACCOUNT',
   FINALIZE_ACCOUNT = 'FINALIZE_ACCOUNT',
   REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD',
   FINALIZE_RESET_PASSWORD = 'FINALIZE_RESET_PASSWORD',
   DASHBOARD = 'DASHBOARD',
   ME = 'ME',
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
   ME = 'ME',
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
   _id: ZenRouteID
   title: string
   path: string
   isPrivate: boolean
   section?: ZenSection
   subpaths?: ZenSubRoute[]
}