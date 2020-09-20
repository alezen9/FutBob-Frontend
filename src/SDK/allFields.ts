import { PlayerType, UserType, ScoreType } from './types'

const allScoreFields: ScoreType = {
    pace: {
        acceleration: true,
        sprintSpeed: true
    },
    shooting: {
        positioning: true,
        finishing: true,
        shotPower: true,
        longShots: true,
        volleys: true,
        penalties: true
    },
    passing: {
        vision: true,
        crossing: true,
        freeKick: true,
        shortPassing: true,
        longPassing: true,
        curve: true
    },
    dribbling: {
        agility: true,
        balance: true,
        reactions: true,
        ballControl: true,
        dribbling: true,
        composure: true
    },
    defense: {
        interceptions: true,
        heading: true,
        defensiveAwareness: true,
        standingTackle: true,
        slidingTackle: true
    },
    physical: {
        jumping: true,
        stamina: true,
        strength: true,
        aggression: true
    }
}

export const allUserFields: UserType = {
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
      score: allScoreFields
    },
    avatar: true,
    username: true,
    email: true,
    phone: true
}

export const allPlayerFields: PlayerType = {
    _id: true,
    user: {
      _id: true,
      name: true,
      surname: true,
      dateOfBirth: true,
      sex: true,
      country: true,
      phone: true,
      email: true
    },
    positions: true,
    state: true,
    score: allScoreFields
}