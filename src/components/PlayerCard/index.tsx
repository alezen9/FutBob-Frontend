import React from 'react'
import { makeStyles } from '@material-ui/core'

const DARK_GOLD = '#46390C'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    width: 300,
    height: 419
  },
  background: {
    position: 'relative',
    width: 300,
    height: 419,
    margin: 'auto',
    backgroundImage: 'url(/images/shield1_full.png)',
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
  name: {
    position: 'absolute',
    top: '56%',
    left: 0,
    transform: 'translateY(-56%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > span': {
      color: DARK_GOLD,
      textTransform: 'uppercase',
      textAlign: 'center',
      fontWeight: '600'
    },
    '&:after': {
      position: 'absolute',
      content: '""',
      width: '80%',
      height: '100%',
      top: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderBottom: `1px solid ${DARK_GOLD}`,
      opacity: '.2'
    }
  },
  skills: {
    position: 'absolute',
    top: '80%',
    left: 0,
    transform: 'translateY(-80%)',
    width: '100%',
    height: '25%',
    display: 'flex'
  },
  leftSkills: {
    position: 'relative',
    //  background: 'rgba(255, 0,0, .3)',
    width: '50%',
    padding: '.5em',
    '&:after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '85%',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      borderRight: `1px solid ${DARK_GOLD}`,
      opacity: '.2'
    }
  },
  rightSkills: {
    position: 'relative',
    //  background: 'rgba(0, 255,0, .3)',
    width: '50%',
    padding: '.5em'
  }
}))

const PlayerCard = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.background} />
      <div className={classes.content}>

        <div className={classes.name}>
          <span>Aleksandar gjoreski</span>
        </div>

        <div className={classes.skills}>
          <div className={classes.leftSkills}>
a
          </div>
          <div className={classes.rightSkills}>
b
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PlayerCard)
