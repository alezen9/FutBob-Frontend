import { PhysicalState, PlayerPosition, PlayerScore } from './types'

export class CreatePlayerInput {
	user: string
	positions: PlayerPosition[]
	state?: PhysicalState
	score: PlayerScore
}

export class UpdatePlayerInput {
	_id: string
	positions?: PlayerPosition[]
	state?: PhysicalState
	score?: PlayerScore
}

export class FiltersPlayer {
	ids?: string[]
	positions?: PlayerPosition[]
	states?: PhysicalState[]
	countries?: string[]
	searchText?: string
}

export enum EnumSortPlayer {
   name = 'name',
   country = 'country',
   age = 'age'
}
export class SortPlayer {
   field?: EnumSortPlayer
   sort?: 'ASC'|'DESC'
}