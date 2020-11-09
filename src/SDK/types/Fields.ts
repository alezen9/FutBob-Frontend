import { Pagination } from "./generic"
import { FieldType, FieldState, Measurements } from '@_entities/Fields'
import { GeoPoint } from "@_entities/generic"

export type FieldFilters = {
    ids?: string[],
    type?: FieldType,
    states?: FieldState[],
    searchText?: string,
    pagination?: Pagination
}

export type UpdateFieldInput = {
    _id: string,
    state?: FieldState,
    type?: FieldType,
    name?: string,
    cost?: number,
    measurements?: Measurements,
    location?: GeoPoint
}

export type CreateFieldInput = Required<Omit<UpdateFieldInput, '_id'>>