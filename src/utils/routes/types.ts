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
   PLAYER_DETAIL = 'PLAYER_DETAIL',
   FREE_AGENTS = 'FREE_AGENTS',
   FREE_AGENT_REGISTER_PLAYER = 'FREE_AGENT_REGISTER_PLAYER',
   FIELDS = 'FIELDS',
   FIELDS_CREATE = 'FIELDS_CREATE',
   FIELDS_DETAIL = 'FIELDS_DETAIL',
   APPOINTMENTS = 'APPOINTMENTS',
   APPOINTMENT_CREATE = 'APPOINTMENT_CREATE',
   APPOINTMENT_DETAIL = 'APPOINTMENT_DETAIL'
   // STATISTICS = 'STATISTICS'
}

export enum ZenSection {
   DASHBOARD = 'DASHBOARD',
   ME = 'ME',
   PLAYERS = 'PLAYERS',
   FREE_AGENTS = 'FREE_AGENTS',
   FIELDS = 'FIELDS',
   APPOINTMENTS = 'APPOINTMENTS',
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
   as?: (...args: any) => string
   displayBack?: boolean
   backRouteID?: ZenRouteID
   isPrivate: boolean
   section?: ZenSection
   isSectionEntryPoint?: boolean
   subpaths?: ZenSubRoute[]
}