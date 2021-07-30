import { AppointmentState } from "./types"



export class TypedPlayerInput {
   _id: string
   type: number
}


export class SimpleInvitesInput {
   confirmed?: TypedPlayerInput[]
   invited?: string[]
}


export class EnhancedInvitesInput {
   blacklisted?: TypedPlayerInput[]
   confirmed?: TypedPlayerInput[]
   invited?: string[]
}


export class CreateAppointmentInput {
   field: string
   start: string
   end: string
   pricePerPlayer?: number
   invites?: SimpleInvitesInput
   notes?: string
}


export class AppointmentMatchTeamInput {
    players: TypedPlayerInput[]
    name?: string
    score: number
}


export class AppointmentMatchInput {
   teamA: AppointmentMatchTeamInput
   teamB: AppointmentMatchTeamInput
   notes?: string
}


export class AppointmentPlayerInput {
   player: TypedPlayerInput
   rating: number
   goals: number
   assists: number
   paidAmount: number
}


export class AppointmentStatsInput {
   individualStats: AppointmentPlayerInput[]
}


export class UpdateAppointmentMainInput {
   _id: string
   field?: string
   pricePerPlayer?: number
   start?: Date|string 
   end?: Date|string
   notes?: string
}


export class UpdateAppointmentInvitesInput {
   _id: string
   invites?: EnhancedInvitesInput
}


export class UpdateAppointmentMatchesInput {
   _id: string
   matches: AppointmentMatchInput[]
}


export class UpdateAppointmentStatsInput {
   _id: string
   stats: AppointmentStatsInput
}


export class UpdateAppointmentStateInput {
   _id: string
   state: AppointmentState
}


export class SetMpvManuallyInput {
   _id: string
   mvpId: string
   notes?: string
}


export class FiltersAppointment {
   ids?: string[]
   states?: AppointmentState[]
}

export enum EnumSortAppointment {
   timeAndDate = 'timeAndDate'
}

export class SortAppointment {
   field?: EnumSortAppointment
   sort?: 'ASC'|'DESC'
}