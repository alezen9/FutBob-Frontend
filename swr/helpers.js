export const userFields = `{
    _id,
    name,
    surname,
    dateOfBirth,
    sex,
    country,
    futsalPlayer {
      _id,
      positions,
      state,
      type,
      score {
        pace {
          acceleration,
          sprintSpeed
        },
        shooting {
          positioning,
          finishing,
          shotPower,
          longShots,
          volleys,
          penalties
        },
        passing {
          vision,
          crossing,
          freeKick,
          shortPassing,
          longPassing,
          curve
        },
        dribbling {
          agility,
          balance,
          reactions,
          ballControl,
          dribbling,
          composure
        },
        defense {
          interceptions,
          heading,
          defensiveAwareness,
          standingTackle,
          slidingTackle
        },
        physical {
          jumping,
          stamina,
          strength,
          aggression
        }
      }
    }
    avatar,
    username,
    email,
    phone
  }`

export const playerFields = `{
    _id,
    user {
      _id,
      name,
      surname,
      dateOfBirth,
      sex,
      country,
      phone,
      email
    },
    positions,
    state,
    score {
      pace {
        acceleration,
        sprintSpeed
      },
      shooting {
        positioning,
        finishing,
        shotPower,
        longShots,
        volleys,
        penalties
      },
      passing {
        vision,
        crossing,
        freeKick,
        shortPassing,
        longPassing,
        curve
      },
      dribbling {
        agility,
        balance,
        reactions,
        ballControl,
        dribbling,
        composure
      },
      defense {
        interceptions,
        heading,
        defensiveAwareness,
        standingTackle,
        slidingTackle
      },
      physical {
        jumping,
        stamina,
        strength,
        aggression
      }
    }
  }`
