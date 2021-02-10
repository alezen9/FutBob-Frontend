export const allItem = `{
   _id,
   positions,
   state,
   user {
      _id,
      registry {
         name,
         surname,
         dateOfBirth,
         sex,
         country,
         phone
      }
   },
   score {
      pace {
         speed,
         stamina
      },
      shooting {
         finishing,
         shotPower,
         longShots
      },
      passing {
         vision,
         shortPassing,
         longPassing
      },
      technique {
         agility,
         ballControl,
         dribbling
      },
      defense {
         interception,
         defensiveAwareness,
         versus
      },
      physical {
         strength
      }
   }
}`

export const allList = `{
   result ${allItem},
   totalCount
}`
