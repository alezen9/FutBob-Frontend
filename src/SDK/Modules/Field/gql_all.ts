import { GQL_FieldType } from "./gql_type";

export const field_allFields: GQL_FieldType = {
    _id: true,
    state: true,
    name: true,
    price: true,
    type: true,
    location: {
       type: true,
       coordinates: true
    },
    measurements: {
       width: true,
       height: true
    }
}