import { GQL_UserType } from "./gql_type"
import { player_score_allFields } from '../Player/gql_all'

export const user_allFields: GQL_UserType = {
    _id: true,
    registry: {
      name: true,
      surname: true,
      dateOfBirth: true,
      sex: true,
      country: true,
      email: true,
      phone: true
    },
    player: {
      _id: true,
      positions: true,
      state: true,
      score: player_score_allFields
    },
    username: true
}