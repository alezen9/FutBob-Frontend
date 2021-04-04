import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { get, reduce } from 'lodash'
import { ThemeType, ZenPalette } from '@_MUITheme'
import { SlidersDialogContent, SlidersDialogActions } from './helpers'
import zenToolbox from '@_utils/toolbox'
import { DefenseIcon, PhysicalIcon } from '@_icons'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined'
import GpsFixedOutlinedIcon from '@material-ui/icons/GpsFixedOutlined'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import { FormikEssentials } from '..'
import ZenDialog from '@_components/ZenDialog'
import { Defense, Pace, Passing, Physical, Shooting, Technique } from '@_SDK_Player/types'
import { getKeyMean } from '@_utils/playerOverall'

const iconProps = {
   style: {
      fontSize: '1.1em',
      marginRight: '.5em'
   }
}

const ScoreValuesIconMap = {
   Pace: <FlashOnIcon {...iconProps} />,
   Passing: <TimelineOutlinedIcon {...iconProps} />,
   Shooting: <GpsFixedOutlinedIcon {...iconProps} />,
   Defense: <DefenseIcon {...iconProps} />,
   Physical: <PhysicalIcon {...iconProps} />,
   Technique: <AllInclusiveIcon {...iconProps} />
}

const useStyles = makeStyles(theme => ({
   mainWrapper: {
      flexBasis: '50%',
      maxWidth: '50%'
   },
   main: {
      borderRadius: 5,
      padding: theme.spacing(2),
      boxShadow: ZenPalette.boxShadow,
      cursor: 'pointer',
      backgroundColor: ZenPalette.paperBackgroundColor,
      transition: 'all .2s ease-in-out',
      '&:hover': {
         filter: theme.type === ThemeType.light
            ? 'brightness(.97)'
            : 'brightness(1.15)',
         transform: 'scale(1.02)'
      }
   },
   title: {
      fontSize: '1em',
      [theme.breakpoints.down('xs')]: {
         fontSize: '.85em'
      }
   },
   titleContainer: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
         marginBottom: '1em'
      }
   }
}))

type Props = {
   title?: string
   name: string
   formikName: string
   values: Pace | Shooting | Passing | Technique | Defense | Physical
   formik: FormikEssentials
}

const SingleScore = (props: Props) => {
   const { title = '-', name, formikName, values, formik } = props
   const classes = useStyles()
   const [openSliders, setOpenSliders] = useState(false)
   const [initialVals, setInitialVals] = useState(values)

   const toggleSliders = useCallback(
      () => {
         setOpenSliders(state => !state)
      }, [])

   const cancelChanges = useCallback(() => {
      formik.setFieldValue(`${formikName}.${name}`, initialVals, false)
      setOpenSliders(false)
   }, [JSON.stringify(initialVals), name, formik.setFieldValue])

   const confirmChanges = useCallback(() => {
      const vals = get(formik, `values.${formikName}.${name}`, {})
      setInitialVals(vals)
      setOpenSliders(false)
   }, [JSON.stringify(get(formik, `values.${formikName}.${name}`, {})), name, formikName])

   const { keyMean, color } = useMemo(() => {
      const keyMean = getKeyMean(values, name, true)
      return {
         keyMean,
         color: zenToolbox.getScoreColor(keyMean)
      }
   }, [JSON.stringify(values), name])

   return (
      <>
         <Grid onClick={toggleSliders} className={classes.mainWrapper} container item xs={6} sm={4}>
            <Grid className={classes.main} item container xs={12}>
               <Grid item xs={12} className={classes.titleContainer}>
                  {ScoreValuesIconMap[title] || 'A'}
                  <Typography variant='caption' className={classes.title}>
                     {title}
                  </Typography>
               </Grid>
               <Grid item xs={12}>
                  <Typography variant='h3' align='right' style={{ color }}>
                     {keyMean}
                  </Typography>
               </Grid>
            </Grid>
         </Grid>
         <ZenDialog
            open={openSliders}
            onClose={cancelChanges}
            title={title}
            fullScreen={false}
            content={<SlidersDialogContent formik={formik} name={name} formikName={formikName} />}
            actions={<SlidersDialogActions cancelChanges={cancelChanges} confirmChanges={confirmChanges} />}
         />
      </>
   )
}

export default React.memo(SingleScore)
