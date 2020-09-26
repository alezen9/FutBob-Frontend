import React, { useCallback, useMemo, useState } from 'react'
import { Grid, Button, Typography, useTheme, useMediaQuery } from '@material-ui/core'
import { get, meanBy, isEmpty } from 'lodash'
import FutsalField from '@_components/FutsalField'
import { useFormik } from 'formik'
import FormikInput from '@_components/FormikInput'
import { playerPhysicalStateOptions, decamelize, initialScoreValues } from '@_utils/helpers'
import { ServerMessage } from '@_utils/serverMessages'
import RadarChart from '@_components/Charts/Radar'
import { OverallScore } from '@_icons'
import { getMeanScoreField } from '@_components/FormikInput/PlayerScoreInputs/SingleScore'
import PlayerScoreInputs from '@_components/FormikInput/PlayerScoreInputs'
import { ProfileTabProps } from '..'
import { PlayerType } from '@_entities/Player'
import { FutBobPalette } from '@_palette'
import CustomDialog from '@_components/Dialog'

const Player = (props: ProfileTabProps) => {
  const { item, setIsLoading, openSnackbar, createEditPlayer, deletePlayer } = props
  const { _id: userId, futsalPlayer, ...restOfUserData } = item
  const [openConfirmDialog, setOpenConfirmDialog] = useState(null)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      if(!get(values, 'positions', []).length || ![0,1,2,3,4].includes(get(values, 'state', null))) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.player_fields_required
        })
        return
      }
      setSubmitting(true)
      const player = {
        ...values,
        user: {
          _id: item._id,
          name: item.name,
          surname: item.surname,
          dateOfBirth: item.dateOfBirth,
          sex: item.sex,
          country: item.country,
          phone: item.phone,
          ...item.email && { email: item.email }
        },
        type: PlayerType.Futsal
      }
      try {
        const done = await createEditPlayer(player)
        if(done) openSnackbar({
          variant: 'success',
          message: values._id
            ? 'Player info updated successfully!'
            : 'Player created successfully'
        })
      } catch(error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      setSubmitting(false)
    },[item, createEditPlayer, openSnackbar])

  const formik = useFormik({
    initialValues: {
      _id: get(futsalPlayer, '_id', null),
      positions: get(futsalPlayer, 'positions', []),
      state: get(futsalPlayer, 'state', undefined),
      score: get(futsalPlayer, 'score', initialScoreValues)
    },
    enableReinitialize: true,
    onSubmit
  })

  const scoreData = useMemo(() => {
    const vals = formik.values.score
    const data = Object.entries(vals).map(([key, value]) => ({
      prop: decamelize(key),
      value: getMeanScoreField(value)
    }))
    return data
  }, [formik.values.score])

  const onDelete = useCallback(
    async () => {
      setIsLoading(true)
      try {
        const done = await deletePlayer()
        if (!done) throw new Error()
        openSnackbar({
          variant: 'success',
          message: 'Player deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      setOpenConfirmDialog(false)
      setIsLoading(false)
    }, [deletePlayer, setIsLoading])

  return (
    <Grid container spacing={3}>
      <OverallScore style={{ margin: 'auto' }} value={parseInt(String(meanBy(scoreData, 'value')))} />
      <Grid item container xs={12} justify='center'>
        <FormikInput
          sm={4}
          type='select'
          options={playerPhysicalStateOptions}
          name='state'
          required
          label='Physical state'
          sortByLabel={false}
          {...formik}
        />
      </Grid>
      <Grid item xs={12} sm={7} style={{ height: 500 }}>
        <RadarChart data={scoreData} />
      </Grid>
      <PlayerScoreInputs formik={formik} gridProps={{ sm: 5 }} />
      <Grid item xs={12}>
        <FutsalField
          type='outdoor'
          name='positions'
          {...formik} />
      </Grid>
      <Grid item container xs={12} justify={isSmallScreen ? 'space-evenly' : 'flex-end'}>
        {get(futsalPlayer, '_id', null) && <Grid item>
          <Button
            style={{ minWidth: 130, color: FutBobPalette.darkRed, marginRight: '1.5em', borderColor: FutBobPalette.darkRed }}
            disabled={formik.isSubmitting}
            onClick={() => setOpenConfirmDialog(true)}
            variant='outlined'>
        Delete
          </Button>
        </Grid>}
        <Grid item>
          <Button
            style={{ minWidth: 130 }}
            disabled={formik.isSubmitting || isEmpty(formik.touched)}
            onClick={() => formik.handleSubmit()}
            variant='contained'
            color='primary'>
            {futsalPlayer ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Grid>
      <CustomDialog
        open={!!openConfirmDialog}
        fullScreen={false}
        title='Attention!'
        content={<Typography >You are about to delete <span style={{ fontWeight: 'bold', color: FutBobPalette.darkRed }}>Yourself</span>, continue and delete?</Typography>}
        actions={
          <Button
            style={{ minWidth: 150, backgroundColor: FutBobPalette.darkRed }}
            onClick={onDelete}
            variant='contained'>
          Delete
          </Button>
        }
        onClose={() => setOpenConfirmDialog(false)}
      />
    </Grid>
  )
}

export default React.memo(Player)
