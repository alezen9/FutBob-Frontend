import { GeoPoint } from "src/SDK/types"

export enum FieldType {
   Indoor,
   Outdoor
}

export enum FieldState {
   Terrible,
   NotGreatNotTerrible,
   Great
}

export class Measurements { // in centimeters
   width: number
   height: number
}

export class Field {
   _id: string
   type: FieldType
   name: string
   measurements: Measurements
   state: FieldState
   price: number // in cents
   location: GeoPoint
}