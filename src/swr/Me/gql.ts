export const allItem = `{
   _id,
   credentials {
      email
   },
   player {
      _id,
      positions,
      state,
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
   },
   registry {
      name,
      surname,
      dateOfBirth,
      sex,
      country,
      phone
   }
}`
