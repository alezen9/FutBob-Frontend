import { GQL_PlayerType } from "../Player/gql_type";

export type GQL_UserType =  {
    _id?: boolean,
    name?: boolean,
    surname?: boolean,
    dateOfBirth?: boolean,
    sex?: boolean,
    country?: boolean,
    futsalPlayer?: GQL_PlayerType,
    avatar?: boolean,
    username?: boolean,
    email?: boolean,
    phone?: boolean
}