import { GeoPoint } from 'src/SDK/types'
import { FieldState, FieldType, Measurements } from './types'

export class CreateFieldInput {
	type: FieldType
	name: string
	state: FieldState
	price: number
	measurements: Measurements
	location: GeoPoint
}

export class UpdateFieldInput {
	_id: string
	type?: FieldType
	name?: string
	state?: FieldState
	price?: number
	measurements?: Measurements
	location?: GeoPoint
}

export class FiltersField {
	ids?: string[]
	type?: FieldType
	states?: FieldState[]
	searchText?: string
}
