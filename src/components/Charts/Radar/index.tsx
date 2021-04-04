import React, { useMemo } from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { useTheme, makeStyles, useMediaQuery } from '@material-ui/core'
import { ThemeType, ZenPalette } from '@_MUITheme'

const useStyles = makeStyles(theme => ({
   main: {
      width: '100%',
      height: '100%',
      '& svg': {
         '& g > g > g': {
            '& > circle': { // opacity on grid
               opacity: theme.type === ThemeType.dark
                  ? '.3 !important'
                  : '.6 !important'
            },
            '& > g > text': {
               [theme.breakpoints.down('xs')]: { // hide label on mobile
                  display: 'none'
               }
            }
         },
         '& + div': {
            '& > div': {
               color: `${ZenPalette.typographyGrey} !important`,
               backgroundColor: `${ZenPalette.backgroundColorStandOut} !important`,
               borderRadius: '5px !important',
               boxShadow: `0 10px 15px rgba(0,0,0,.2) !important`
            }
         },
         '& text': {
            fill: `${ZenPalette.typographyGrey} !important`
         }
      }
   }
}))

export type RadarChartData = {
   prop: string
   value: number
}

type Props = {
   data: RadarChartData[]
}

const RadarChart = ({ data = [] }: Props) => {
   const classes = useStyles()
   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
   const blendMode = useMemo(() => theme.type === 'dark' ? 'normal' : 'multiply', [theme.type])
   const margin = useMemo(() => {
      return isSmallScreen
         ? { top: 0, right: 0, bottom: 0, left: 0 }
         : { top: 70, right: 80, bottom: 40, left: 80 }
   }, [isSmallScreen])

   return (
      <div className={classes.main}>
         <ResponsiveRadar
            data={data}
            keys={['value']}
            indexBy='prop'
            maxValue={100}
            margin={margin}
            curve='linearClosed'
            borderWidth={2}
            borderColor={{ theme: 'background' }}
            gridLevels={5}
            gridShape='circular'
            gridLabelOffset={30}
            enableDots
            dotSize={10}
            dotColor={{ from: 'color' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color' }}
            enableDotLabel
            dotLabel='value'
            dotLabelYOffset={-12}
            colors={{ scheme: 'dark2' }}
            fillOpacity={0.25}
            blendMode={blendMode}
            animate
            motionStiffness={90}
            motionDamping={15}
            isInteractive
            legends={[]}
         />
      </div>
   )
}

export default React.memo(RadarChart)
