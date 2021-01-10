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

export const getMeanScoreField = fieldData => {
  const { nItems, totVal } = reduce(fieldData, (acc, value) => ({
    nItems: acc.nItems + 1,
    totVal: acc.totVal + value
  })
  , { nItems: 0, totVal: 0 })
  return nItems === 0
    ? 0
    : Math.trunc(totVal / nItems)
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
  values?: {
    [field: string]: number
  }
  formik: FormikEssentials
}

const SingleScore = (props: Props) => {
  const { title = '-', name, values = {}, formik } = props
  const classes = useStyles()
  const [openSliders, setOpenSliders] = useState(false)
  const [initialVals, setInitialVals] = useState(get(formik, `values.score.${name}`, {}))

  useEffect(() => {
    if (!openSliders) setInitialVals(get(formik, `values.score.${name}`, {}))
  }, [get(formik, `values.score.${name}`, {})])

  const cancelChanges = useCallback(
    () => {
      formik.setFieldValue(`score.${name}`, initialVals, false)
    }, [initialVals, formik.setFieldValue])

  const toggleSliders = useCallback(
    (_cancelChanges: boolean = true) => () => {
      setOpenSliders(state => !state)
      if (_cancelChanges) cancelChanges()
    }, [cancelChanges])

  const { score, color } = useMemo(() => {
    const score = getMeanScoreField(values)
    return {
      score,
      color: getScoreColor(score)
    }
  }, [values])

  return (
      <>
        <Grid onClick={toggleSliders(false)} className={classes.mainWrapper} container item xs={6} sm={4}>
          <Grid className={classes.main} item container xs={12}>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              {ScoreValuesIconMap[title] || 'A'}
              <Typography variant='caption' style={{ fontSize: '1em' }}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h3' align='right' style={{ color }}>
                {score}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <ZenDialog
          open={openSliders}
          onClose={toggleSliders()}
          title={title}
          fullScreen={false}
          content={<SlidersDialogContent formik={formik} name={name} />}
          actions={<SlidersDialogActions cancelChanges={toggleSliders()} confirmChanges={toggleSliders(false)} />}
        />
    </>
  )
}

export default React.memo(SingleScore)
