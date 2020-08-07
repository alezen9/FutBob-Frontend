import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@keyframes animateOpacity': {
    '0%': { opacity: 0 },
    '70%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  mobileAddButton: {
    position: 'absolute',
    top: '.2em',
    right: '3em',
    opacity: 0
  },
  opacityFix: {
    opacity: 0,
    animation: '$animateOpacity 1s forwards'
  }
}))

const MatchesContainer = props => {
  const { isMounted = false } = props
  const classes = useStyles()

  return (
    <div>
      matches
    </div>
  )
}

export default React.memo(MatchesContainer)
