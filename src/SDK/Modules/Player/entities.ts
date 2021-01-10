import { User } from "..//User/entities"

export enum PlayerPosition {
   FutsalGoalKeeper,
   FutsalBack,
   FutsalLeftWing,
   FutsalRightWing,
   FutsalForward
}

export type Pace = {
   speed?: number
   stamina?: number
}

export type Shooting = {
   finishing?: number
   shotPower?: number
   longShots?: number
}

export type Passing = {
   vision?: number
   shortPassing?: number
   longPassing?: number
}

export type Technique = {
   agility?: number
   ballControl?: number
   dribbling?: number
}

export type Defense = {
   interception?: number
   defensiveAwareness?: number
   versus?: number
}

export type Physical = {
   strength?: number
}

export type PlayerScore = {
   pace?: Pace
   shooting?: Shooting
   passing?: Passing
   technique?: Technique
   defense?: Defense
   physical?: Physical
}

export enum PhysicalState {
   Top,
   Medium,
   Low,
   Injured,
   Recovery
}

export type Player = {
   _id: string
   user: User
   positions: PlayerPosition[]
   state: PhysicalState
   score: PlayerScore
}