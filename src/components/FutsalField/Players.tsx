import React, { useMemo } from 'react'
import { makeStyles, Theme } from '@mui/material'
import { get } from 'lodash'

const useStyles = makeStyles<Theme, { active?: boolean, cssPosition?: CSSPosition }>((theme) => ({
   main: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1,
      '&>div': {
         transform: 'rotateX(-30deg) translateY(-44px)'
      }
   },
   player: (props: any) => ({
      position: 'absolute',
      width: 35,
      height: 35,
      background: props.active
         ? '#333'
         : 'rgba(255,255,255,.3)',
      color: '#fafafa',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #fafafa',
      cursor: 'pointer',
      ...props.cssPosition,
      transition: 'transform .2s ease, border .2s ease',
      '&:hover': {
         border: '2px solid red',
         transform: 'rotateX(-30deg) translateY(-48px) scale(1.05)'
      },
      ...get(props, 'cssPosition.left', null) === '45%' && {
         [theme.breakpoints.down('xs')]: {
            left: '43%'
         }
      }
   })
}))

type PlayerProps = {
   position?: number
   active?: boolean
   label?: string | number
   onClick: (pos: number) => void
}

const Player = React.memo((props: PlayerProps) => {
   const { position = 0, active = false, label = '', onClick } = props
   const cssPosition = useMemo(() => getCssPosition(position), [position])
   const { player } = useStyles({ cssPosition, active })

   return <div className={player} onClick={() => onClick(position)}>{active ? label || '' : ''}</div>
})

type PlayersProps = {
   values?: number[]
   onClick: (pos: number) => void
}

const Players = (props: PlayersProps) => {
   const { values = [], onClick } = props
   const { main } = useStyles({})

   const players = useMemo(() => {
      const res = []
      for (let i = 0; i < 5; i++) {
         res.push(<Player
            key={`player-${i}`}
            position={i}
            active={values.includes(i)}
            label={values.findIndex(el => el === i) + 1}
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

type CSSPosition = {
   top?: string | number
   bottom?: string | number
   left?: string | number
   right?: string | number
}

const getCssPosition = (pos: number): CSSPosition => {
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
