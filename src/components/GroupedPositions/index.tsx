import React, { useEffect, useState } from 'react'
import { AvatarGroup } from '@material-ui/lab'
import { PlayerPosition } from '@_SDK_Player/types'
import { Avatar, makeStyles } from '@material-ui/core'
import { ShortName_Position } from '@_utils/constants/ShortNamePlayerProps'
import { uniqueId } from 'lodash'
import { ZenPalette } from '@_MUITheme'

const useStyles = makeStyles(theme => ({
   group: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover > div': {
         margin: 'auto -.1em !important',
      },
      [theme.breakpoints.down('xs')]: {
         justifyContent: 'flex-start',
         '&:hover > div': {
            margin: 'auto -.1em !important',
         }
      }
   },
   avatar: {
      width: 35,
      height: 35,
      backgroundColor: `${ZenPalette.paperBackgroundColor} !important`,
      border: 'none',
      color: ZenPalette.typographyGrey,
      boxShadow: ZenPalette.boxShadow,
      margin: 'auto -.4em !important',
      transition: 'margin .2s ease-in-out, background-color .1s ease',
      [theme.breakpoints.down('xs')]: {
         margin: 'auto -.1em !important'
      }
   }
}))

type Props = {
   positions: PlayerPosition[]
}

const GroupedPositions: React.FC<Props> = props => {
   const { positions = [] } = props
   const classes = useStyles()

   return (
      <AvatarGroup max={5} className={classes.group}>
         {positions.map(pos => {
            const short = ShortName_Position[pos]
            return <Avatar className={classes.avatar} key={uniqueId()} alt={short}>
               <span style={{ fontSize: '.6em' }}>{short}</span>
            </Avatar>
         })}
      </AvatarGroup>
   )
}

export default React.memo(GroupedPositions)
