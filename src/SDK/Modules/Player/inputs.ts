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
