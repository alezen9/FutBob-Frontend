import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { ZenPalette } from '@_palette'
import Flags from 'country-flag-icons/react/1x1'
import { PlayerPosition, PlayerScore } from '@_SDK_Player/types'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { getPlayerOverall } from '@_utils/playerOverall'
import { chunk, get, uniqueId } from 'lodash'
import { ShortName_Position, ShortName_Skill } from '@_utils/constants/ShortNamePlayerProps'

const DARK_GOLD = '#46390C'
const TEXT_GOLD = '#45360d'

const useStyles = makeStyles(theme => ({
  '@keyframes shine': {
    '0%': {
      backgroundPosition: 'right'
    }
  },
  shine: {
    position: 'relative',
    color: 'rgba(218, 165, 32, 1)',
    '&:after': {
      position: 'absolute',
      content: '""',
      top: '50%',
      left: '50%',
      height: '100%',
      width: '100%',
      transform: 'translate(-50%, -50%)',
      clipPath: 'polygon(50% 0%, 70% 2%, 87% 5%, 90% 11%, 100% 14%, 100% 86%, 89% 90%, 61% 97%, 51% 100%, 40% 97%, 10% 90%, 0% 86%, 0% 14%, 10% 11%, 13% 6%, 30% 2%)',
      backgroundImage: ZenPalette.shineBackgroundImage,
      backgroundSize: '800% 100%',
      animation: '$shine 6s infinite'
    }
  },
  container: {
    position: 'relative',
    width: 300,
    height: 489,
    transform: 'scale(.85)',
    transformOrigin: 'top',
    fontFamily: "'Roboto Condensed', Poppins, sans-serif",
    marginBottom: -30
  },
  background: {
    position: 'relative',
    width: 300,
    height: 489,
    margin: 'auto',
    backgroundImage: 'url(/images/shield0.png)',
    backgroundSize: '100%',
    filter: 'contrast(.8)'
  },
  content: {
    position: 'absolute',
    top: 0,
    left: '12.5%',
    width: '75%',
    height: '100%'
  },
  // components
  upperInfo: {
    position: 'absolute',
    top: '20%',
    left: 0,
    transform: 'translateY(-20%)',
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    color: TEXT_GOLD,
    '& > span': {
      fontSize: '1.5em'
    },
    '& > span:first-of-type': {
      fontSize: '3em',
      fontWeight: 700
    }
  },
  name: {
    position: 'absolute',
    top: '60%',
    left: 0,
    transform: 'translateY(-60%)',
    fontSize: '1.6em',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > span': {
      color: TEXT_GOLD,
      textTransform: 'uppercase',
      textAlign: 'center',
      fontWeight: 700
    }
  },
  skills: {
    position: 'absolute',
    top: '88%',
    left: 0,
    transform: 'translateY(-88%)',
    width: '100%',
    height: '25%',
    display: 'flex',
    color: TEXT_GOLD
  },
  skillSection: {
    position: 'relative',
    width: '50%',
    padding: '.5em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    '&:last-of-type': {
      alignItems: 'flex-end'
    },
    '& > div': {
      width: 75,
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.4em',
      '& > span:first-of-type': {
        fontWeight: 700,
        textAlign: 'center'
      },
      '& > span:last-of-type': {
        textAlign: 'center'
      }
    }
  }
}))



type Props = {
   score: PlayerScore
   positions: PlayerPosition[]
   country: string
   surname: string
}

const PlayerCard: React.FC<Props> = props => {
   const { score = initialScoreValues, positions = [], country, surname } = props
  const classes = useStyles()


  const { left, right, overall } = useMemo(() => {
     const { chartData, overall } = getPlayerOverall(score, positions)
      const [left, right] = chunk(chartData, 3)
      return {
         left,
         right,
         overall
      }
   }, [JSON.stringify(score), JSON.stringify(positions)])

   const _surname = useMemo(() => {
      const surnames = surname.split(' ')
      if(surnames.length === 1) return surnames[0]
      const secondSurnameLength = surnames[1].length
      const secondSurnameToDisplay = secondSurnameLength > 7
         ? `${surnames[1][0]}.`
         : surnames[1]
      return `${surnames[0]} ${secondSurnameToDisplay}`
   }, [surname])

   const Flag = Flags[country]

  return (
    <div className={classes.container}>
      <div className={`${classes.background} ${classes.shine}`} />
      <div className={classes.content}>

        <div className={classes.upperInfo}>
          <span>{overall}</span>
          <span>{ShortName_Position[get(positions, '0', null)]}</span>
          <span>
            {Flag && <Flag style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,.3))', width: 30, borderRadius: '50%' }} />}
          </span>
        </div>

        <div className={classes.name}>
          <span>{_surname}</span>
        </div>

        <div className={classes.skills}>
          <div className={classes.skillSection}>
             {left.map(({ prop, value }) => {
                return (
                   <div key={uniqueId()}>
                     <span>{value}</span>
                     <span>{ShortName_Skill[prop]}</span>
                  </div>
                )
             })}
          </div>
          <div className={classes.skillSection}>
             {right.map(({ prop, value }) => {
                return (
                   <div key={uniqueId()}>
                     <span>{value}</span>
                     <span>{ShortName_Skill[prop]}</span>
                  </div>
                )
             })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PlayerCard)
