import { User } from "./User"

export enum PlayerPosition {
    FutsalGoalKeeper,
    FutsalBack,
    FutsalLeftWing,
    FutsalRightWing,
    FutsalForward,
    Goalkeeper,
    Sweeper,
    CentreBack,
    LeftFullBack,
    RightFullBack,
    LeftWingBack,
    RightWingBack,
    DefensiveMidfielder,
    CentralMidfielder,
    LeftMidfielder,
    RightMidfielder,
    AttackingMidfielder,
    CenterForward,
    Striker,
    SecondStriker
}

export type Pace = {
    acceleration?: number
    sprintSpeed?: number
}

export type Shooting = {
    positioning?: number
    finishing?: number
    shotPower?: number
    longShots?: number
    volleys?: number
    penalties?: number
}

export type Passing = {
    vision?: number
    crossing?: number
    freeKick?: number
    shortPassing?: number
    longPassing?: number
    curve?: number
}

export type Dribbling = {
    agility?: number
    balance?: number
    reactions?: number
    ballControl?: number
    dribbling?: number
    composure?: number
}

export type Defense = {
    interceptions?: number
    heading?: number
    defensiveAwareness?: number
    standingTackle?: number
    slidingTackle?: number
}

export type Physical = {
    jumping?: number
    stamina?: number
    strength?: number
    aggression?: number
}

export type PlayerScore = {
    pace?: Pace
    shooting?: Shooting
    passing?: Passing
    dribbling?: Dribbling
    defense?: Defense
    physical?: Physical
}

export enum PlayerType {
    Football,
    Futsal
}

export enum PhysicalState {
    Top,
    Medium,
    Low,
    Injured,
    Recovery
}

export interface Player {
    _id: string
    user: User
    positions: PlayerPosition[]
    type: PlayerType
    matches?: string[]
    state: PhysicalState
    score: PlayerScore
}

export type EditablePlayer = Partial<Player>