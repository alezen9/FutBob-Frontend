import { PhysicalState, Player, PlayerPosition, PlayerScore, PlayerType } from "./entities";
import { User } from "..//User/entities";
import { Pagination } from "../generic_types";

export type PlayerFilters = {
   ids?: string[],
   positions?: PlayerPosition[],
   type?: PlayerType,
   states?: PhysicalState[],
   countries?: string[],
   searchText?: string,
   pagination?: Pagination
}

export type DeletePlayerInput = {
   _id: string
   idUser: string
   type: PlayerType
}

export type UpdatePlayerInput = {
   _id: string
   positions?: PlayerPosition[]
   state?: PhysicalState
   score?: Required<PlayerScore>
}

export type CreatePlayerInput = {
   userId?: string
   userData?: Omit<User, '_id'|'futsalPlayer'>
   playerData: Omit<Player, '_id'|'user'>
}

export type EditablePlayer = Partial<Player>