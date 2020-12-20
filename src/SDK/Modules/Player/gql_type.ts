import { GQL_UserType } from "../User/gql_type"

export type GQL_ScoreType = {
    pace?: {
        acceleration?: boolean,
        sprintSpeed?: boolean
    },
    shooting?: {
        positioning?: boolean,
        finishing?: boolean,
        shotPower?: boolean,
        longShots?: boolean,
        volleys?: boolean,
        penalties?: boolean
    },
    passing?: {
        vision?: boolean,
        crossing?: boolean,
        freeKick?: boolean,
        shortPassing?: boolean,
        longPassing?: boolean,
        curve?: boolean
    },
    dribbling?: {
        agility?: boolean,
        balance?: boolean,
        reactions?: boolean,
        ballControl?: boolean,
        dribbling?: boolean,
        composure?: boolean
    },
    defense?: {
        interceptions?: boolean,
        heading?: boolean,
        defensiveAwareness?: boolean,
        standingTackle?: boolean,
        slidingTackle?: boolean
    },
    physical?: {
        jumping?: boolean,
        stamina?: boolean,
        strength?: boolean,
        aggression?: boolean
    }
}

export type GQL_PlayerType = {
    _id?: boolean,
    user?: GQL_UserType,
    positions?: boolean,
    state?: boolean,
    type?: boolean,
    score?: GQL_ScoreType
}