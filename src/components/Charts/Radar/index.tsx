import React, { useMemo } from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { useTheme, makeStyles, useMediaQuery } from '@material-ui/core'
import { ThemeType, ZenPalette } from '@_MUITheme'

const useStyles = makeStyles(theme => ({
   main: {
      width: '100%',
      height: '100%',
      [theme.breakpoints.down('xs')]: {
         width: '100vw',
         marginLeft: -theme.spacing(4)
      },
      '& svg': {
         '& g > g > g': {
            '& > g > text': {
               [theme.breakpoints.down('xs')]: { // hide label on mobile
                  visibility: 'hidden'
               }
            }
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
   const blendMode = useMemo(() => theme.type === ThemeType.dark ? 'normal' : 'multiply', [theme.type])
   const margin = useMemo(() => {
      return isSmallScreen
         ? { top: 0, right: 0, bottom: 0, left: 0 }
         : { top: 50, right: 60, bottom: 20, left: 60 }
   }, [isSmallScreen])

   return (
      <div className={classes.main}>
         <ResponsiveRadar
            data={data}
            keys={['value']}
            theme={{
               textColor: ZenPalette.typographyGrey,
               grid: {
                  line: {
                     stroke: ZenPalette.dividerColor,
                     opacity: ZenPalette.themeType === ThemeType.dark
                        ? .3
                        : .6
                  }
               },
               tooltip: {
                  container: {
                     color: ZenPalette.typographyGrey,
                     backgroundColor: ZenPalette.backgroundColorStandOut,
                     borderRadius: 5,
                     boxShadow: ZenPalette.boxShadow
                  }
               }
            }}
            indexBy='prop'
            maxValue={100}
            margin={margin}
            curve='linearClosed'
            borderWidth={2}
            borderColor={{ theme: 'background' }}
            gridLevels={5}
            gridShape='circular'
            gridLabelOffset={10}
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
