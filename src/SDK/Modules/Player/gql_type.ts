import { GQL_UserType } from "../User/gql_type"

export type GQL_ScoreType = {
    pace?: {
        speed?: boolean,
        stamina?: boolean
    },
    shooting?: {
        finishing?: boolean,
        shotPower?: boolean,
        longShots?: boolean
    },
    passing?: {
        vision?: boolean,
        shortPassing?: boolean,
        longPassing?: boolean
    },
    technique?: {
        agility?: boolean,
        ballControl?: boolean,
        dribbling?: boolean
    },
    defense?: {
        interception?: boolean,
        defensiveAwareness?: boolean,
        versus?: boolean
    },
    physical?: {
        strength?: boolean
    }
}

export type GQL_PlayerType = {
    _id?: boolean,
    user?: GQL_UserType,
    positions?: boolean,
    state?: boolean,
    score?: GQL_ScoreType
}