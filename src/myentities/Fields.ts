import { GeoPoint } from './generic'

export enum FieldType {
   Indoor,
   Outdoor
}

export enum FieldState {
   Terrible,
   NotGreatNotTerrible,
   Great
}

export type Measurements = {
   width: number
   height: number
}

export type Field = {
   _id: string
   type: FieldType
   name: string
   measurements: Measurements
   state: FieldState
   price: number
   location: GeoPoint
}