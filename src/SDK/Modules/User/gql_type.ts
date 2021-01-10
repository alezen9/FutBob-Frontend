import { GQL_PlayerType } from "../Player/gql_type";

export type GQL_UserRegistryType = {
   name?: boolean,
   surname?: boolean,
   dateOfBirth?: boolean,
   sex?: boolean,
   country?: boolean,
   email?: boolean,
   phone?: boolean
}

export type GQL_UserType =  {
    _id?: boolean,
    registry?: GQL_UserRegistryType
    player?: GQL_PlayerType,
    username?: boolean,
}