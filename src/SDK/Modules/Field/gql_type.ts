type GQL_GeoPoint = {
   type?: boolean
   coordinates?: boolean
}

export type GQL_FieldType = {
   _id?: boolean
   type?: boolean
   name?: boolean
   measurements?: {
      width?: boolean
      height?: boolean
   },
   state?: boolean
   price?: boolean
   location?: GQL_GeoPoint
}