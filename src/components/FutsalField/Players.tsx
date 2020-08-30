import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    '&>div': {
      transform: 'rotateX(-30deg) translateY(-44px)'
    }
  },
  player: ({ cssPosition = {}, active = false }) => ({
    position: 'absolute',
    width: 35,
    height: 35,
    background: active
      ? '#333'
      : 'rgba(255,255,255,.3)',
    color: '#fafafa',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #fafafa',
    cursor: 'pointer',
    ...cssPosition,
    transition: 'transform .2s ease, border .2s ease',
    '&:hover': {
      border: '2px solid red',
      transform: 'rotateX(-30deg) translateY(-48px) scale(1.05)'
    },
    ...cssPosition.left === '45%' && {
      [theme.breakpoints.down('xs')]: {
        left: '43%'
      }
    }
  })
}))

const Player = React.memo(props => {
  const { position = 0, active = false, label = '', onClick } = props
  const cssPosition = useMemo(() => getCssPosition(position), [position])
  const { player } = useStyles({ cssPosition, active })

  return <div className={player} onClick={() => onClick(position)}>{label || ''}</div>
})

const Players = props => {
  const { values = [], onClick } = props
  const { main } = useStyles()

  const players = useMemo(() => {
    const res = []
    for (let i = 0; i < 5; i++) {
      res.push(<Player
        key={`player-${i}`}
        position={i}
        active={values.includes(i)}
        onClick={onClick} />)
    }
    return res
  }, [values])

  return (
    <div className={main}>
      {players}
    </div>
  )
}

export default React.memo(Players)

const getCssPosition = pos => {
  switch (pos) {
    case 0:
      return {
        bottom: '-10%',
        left: '45%'
      }
    case 1:
      return {
        bottom: '7%',
        left: '45%'
      }
    case 2:
      return {
        top: '65%',
        left: '15%'
      }
    case 3:
      return {
        top: '65%',
        right: '15%'
      }
    case 4:
      return {
        top: '45%',
        left: '45%'
      }
    default:
      return {
        top: 0,
        left: 0
      }
  }
}
