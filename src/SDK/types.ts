export type ScoreType = {
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

export type UserType =  {
    _id?: boolean,
    name?: boolean,
    surname?: boolean,
    dateOfBirth?: boolean,
    sex?: boolean,
    country?: boolean,
    futsalPlayer?: PlayerType,
    avatar?: boolean,
    username?: boolean,
    email?: boolean,
    phone?: boolean
}

export type PlayerType = {
    _id?: boolean,
    user?: UserType,
    positions?: boolean,
    state?: boolean,
    type?: boolean,
    score?: ScoreType
}