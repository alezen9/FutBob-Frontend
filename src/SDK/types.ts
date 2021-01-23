export class GeoPoint {
    type: string
    coordinates: number[]
}

export interface List<T> {
    totalCount: number,
    result: T[]
}
export class Pagination {
   skip: number
   limit?: number
}