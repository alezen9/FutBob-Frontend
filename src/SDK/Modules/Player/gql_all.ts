import { GQL_PlayerType, GQL_ScoreType } from "./gql_type"

export const player_score_allFields: GQL_ScoreType = {
    pace: {
        speed: true,
        stamina: true
    },
    shooting: {
        finishing: true,
        shotPower: true,
        longShots: true
    },
    passing: {
        vision: true,
        shortPassing: true,
        longPassing: true
    },
    technique: {
        agility: true,
        ballControl: true,
        dribbling: true
    },
    defense: {
        defensiveAwareness: true,
        interception: true,
        versus: true
    },
    physical: {
        strength: true
    }
}



export const player_allFields: GQL_PlayerType = {
    _id: true,
    user: {
      _id: true,
      registry: {
         name: true,
         surname: true,
         dateOfBirth: true,
         sex: true,
         country: true,
         phone: true,
         email: true
      }
    },
    positions: true,
    state: true,
    score: player_score_allFields
}