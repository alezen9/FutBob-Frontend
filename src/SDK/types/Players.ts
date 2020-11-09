import { PhysicalState, Player, PlayerPosition, PlayerScore, PlayerType } from "@_entities/Player";
import { User } from "@_entities/User";
import { Pagination } from "./generic";

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