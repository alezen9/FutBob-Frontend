import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { get, reduce } from 'lodash'
import { ZenPalette } from '@_palette'
import { SlidersDialogContent, SlidersDialogActions } from './helpers'
import { getScoreColor } from '@_utils/helpers'
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
    borderRadius: 10,
    padding: theme.spacing(2),
    boxShadow: ZenPalette.boxShadow,
    cursor: 'pointer',
    backgroundColor: ZenPalette.paperBackgroundColor
  }
}))

type Props = {
  title?: string
  name: string
  formikName: string
  values: Pace|Shooting|Passing|Technique|Defense|Physical
  formik: FormikEssentials
}

const SingleScore = (props: Props) => {
  const { title = '-', name, formikName, values, formik } = props
  const classes = useStyles()
  const [openSliders, setOpenSliders] = useState(false)
  const [initialVals, setInitialVals] = useState(get(formik, `values.${formikName}`, {}))

  const toggleSliders = useCallback(
   () => {
      setOpenSliders(state => !state)
   }, [])

   const cancelChanges = useCallback(() => {
      formik.setFieldValue(`${formikName}.${name}`, initialVals, false)
      setOpenSliders(false)
   }, [initialVals, formik.setFieldValue])

   const confirmChanges = useCallback(() => {
      setInitialVals(get(formik, `values.${formikName}.${name}`, {}))
      setOpenSliders(false)
   }, [get(formik, `values.${formikName}.${name}`, {})])

  const { keyMean, color } = useMemo(() => {
    const keyMean = getKeyMean(values, name, true)
    return {
      keyMean,
      color: getScoreColor(keyMean)
    }
  }, [values])

  return (
      <>
        <Grid onClick={toggleSliders} className={classes.mainWrapper} container item xs={6} sm={4}>
          <Grid className={classes.main} item container xs={12}>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              {ScoreValuesIconMap[title] || 'A'}
              <Typography variant='caption' style={{ fontSize: '1em' }}>
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
