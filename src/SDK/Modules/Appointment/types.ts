import { Field } from "@_SDK_Field/types"
import { FreeAgent } from "@_SDK_FreeAgent/types"
import { Player } from "@_SDK_Player/types"


export enum AppointmentPlayerType {
    Registered,
    FreeAgent
}

export class AppointmentTypePlayer {
    player: Player|FreeAgent
    type: AppointmentPlayerType
}

export class AppointmentPlayerMatchStats {
    total: number
    won: number
    lost: number
    draw: number
}


export class AppointmentPlayer {
    player: AppointmentTypePlayer
    rating: number
    goals: number
    assists: number
    matchStats?: AppointmentPlayerMatchStats
    paidAmount: number
}

export class AppointmentStatsMVP {
    player: AppointmentTypePlayer
    notes?: string
}


export class AppointmentStats {
    totalGoals: number
    totalAssists: number
    mvp?: AppointmentStatsMVP
    mvpElegible: AppointmentTypePlayer[]
    topScorers: AppointmentTypePlayer[]
    topAssistmen: AppointmentTypePlayer[]
    individualStats: AppointmentPlayer[]
}

export enum AppointmentState {
    Scheduled,
    Confirmed,
    Completed,
    Canceled,
    Interrupted
}


export class AppointmentMatchTeam {
    players: AppointmentTypePlayer[]
    name: string
    score: number
}


export class AppointmentMatch {
    teamA: AppointmentMatchTeam
    teamB: AppointmentMatchTeam
    winner: 'teamA'|'teamB'|'draw'
    notes?: string
}

export enum AppointmentInvitesState {
    Open,
    Closed
}

export enum InviteResponseType {
    Accepted,
    Declined
}

export enum InviteListType {
    Confirmed,
    Declined,
    Waiting,
    Blacklist,
    Ignored
}


export class AppointmentInvitesInvitedPlayer {
    player: Player
    totalResponses: number 
}


export class AppointmentInviteLists {
    invited: AppointmentInvitesInvitedPlayer[]
    declined: Player[]
    waiting: AppointmentTypePlayer[]
    confirmed: AppointmentTypePlayer[]
    blacklisted: AppointmentTypePlayer[]
    ignored: Player[]
}

export enum AppointmentInvitesMode {
    Auto,
    Manual
}

export class AppointmentInvites {
    lists: AppointmentInviteLists
}


export class AppointmentDate {
    start: string
    end: string
}


export class Appointment {
    _id: string
    date: AppointmentDate
    field: Field
    state: AppointmentState
    invites: AppointmentInvites
    pricePerPlayer: number
    stats?: AppointmentStats
    matches?: AppointmentMatch[]
    notes?: string
}