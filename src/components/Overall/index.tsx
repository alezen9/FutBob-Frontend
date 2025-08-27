import React, { CSSProperties, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { ThemeType } from '@_MUITheme'
import zenToolbox from '@_utils/toolbox'

const useStyles = makeStyles(theme => ({
   '@keyframes shine': {
      from: { WebkitMaskPosition: '150%' },
      to: { WebkitMaskPosition: '-50%' }
   },
   shine: {
      position: 'relative',
      color: 'rgba(218, 165, 32, 1)',
      filter: theme.type === ThemeType.dark
         ? 'brightness(1.75)'
         : 'brightness(.8)',
      WebkitMaskImage: 'linear-gradient(-75deg, rgba(0, 0, 0, .6) 30%, #000 50%, rgba(0, 0, 0, .6) 70%)',
      WebkitMaskSize: '200%',
      animation: '$shine 2s ease infinite'
   }
}))

type Props = {
   overall: number
   style?: CSSProperties
}

const Overall: React.FC<Props> = props => {
   const { overall, style } = props
   const classes = useStyles()

   const color = useMemo(() => {
      return zenToolbox.getScoreColor(overall)
   }, [overall])
   return <span className={classes.shine} style={{ fontSize: '1.5em', fontWeight: 400, color, ...style || {} }}>
      {overall}
   </span>
}

export default React.memo(Overall)
