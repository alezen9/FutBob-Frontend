import { GQL_UserType } from "./gql_type"
import { player_score_allFields } from '../Player/gql_all'

export const user_allFields: GQL_UserType = {
    _id: true,
    name: true,
    surname: true,
    dateOfBirth: true,
    sex: true,
    country: true,
    futsalPlayer: {
      _id: true,
      positions: true,
      state: true,
      type: true,
      score: player_score_allFields
    },
    avatar: true,
    username: true,
    email: true,
    phone: true
}