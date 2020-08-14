import React, { useMemo, useCallback, useState } from 'react'
import { usePlayerStore } from '../../../zustand/playersStore'
import { Grid, Button, Typography } from '@material-ui/core'
import FormikInput from '../../../components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, meanBy, get, isEqual } from 'lodash'
import FutsalField from '../../../components/FutsalField'
import { playerPhysicalStateOptions, decamelize, initialRadarValues } from '../../../utils/helpers'
import { OverallScore } from '../../../assets/CustomIcon'
import RadarChart from '../../../components/Charts/Radar'
import { apiInstance } from '../../../SDK'
import { useConfigStore } from '../../../zustand/configStore'
import { ServerMessage } from '../../../utils/serverMessages'
import { FutBobPalette } from '../../../../palette'
import { useRouter } from 'next/router'
import CustomDialog from '../../../components/Dialog'

const PlayerDetail = props => {
  const { item = {}, setItem } = usePlayerStore(state => ({
    item: state.item,
    setItem: state.setItem
  }))
  const { setIsLoading, openSnackbar, pageTitle, setPageTitle } = useConfigStore()
  const router = useRouter()
  const [openConfirmDialog, setOpenConfirmDialog] = useState()

  const onSubmit = useCallback(
    async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        let done = false
        let idPlayer
        const { _id, positions, state, radar, user } = values
        const { _id: itemId, positions: itemPositions, state: itemState, radar: itemRadar, user: itemUser } = item

        if (!positions || !positions.length || [null, undefined].includes(state)) {
          const err = 'player_fields_required'
          throw err
        }
        const playerData = {
          type: 1,
          positions,
          state
        }
        if (_id) {
          const bodyUpdatePlayer = {
            _id,
            positions,
            state,
            radarData: radar
          }
          if (!isEqual(user, itemUser)) {
            done = await apiInstance.user_updateUser(user)
          }
          if (!isEqual(bodyUpdatePlayer, {
            _id: itemId,
            positions: itemPositions,
            state: itemState,
            radarData: itemRadar
          })) {
            done = await apiInstance.player_updatePlayer(bodyUpdatePlayer)
          }
        } else {
          const bodyCreate = {
            userData: user,
            playerData: {
              ...playerData,
              radarData: radar
            }
          }
          idPlayer = await apiInstance.player_createPlayer(bodyCreate)
        }
        if ((_id && !done) || (!_id && !idPlayer)) throw new Error()
        if (done || idPlayer) {
          openSnackbar({
            variant: 'success',
            message: _id
              ? 'Player info updated successfully!'
              : 'Player created successfully'
          })
        }
        if (idPlayer) {
          router.replace('/players/[id]', `/players/${idPlayer}`)
        }
      } catch (error) {
        console.log(error)
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || ServerMessage.generic
        })
      }
      setIsLoading(false)
      setSubmitting(false)
    }, [item])

  const onDelete = useCallback(
    async () => {
      setIsLoading(true)
      try {
        const done = await apiInstance.player_deletePlayer({
          _id: item._id,
          idUser: item.user._id,
          type: 1
        })
        if (!done) throw new Error()
        router.replace('/players')
        openSnackbar({
          variant: 'success',
          message: 'Player deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || ServerMessage.generic
        })
      }
      setIsLoading(false)
    }, [item])

  const formik = useFormik({
    initialValues: {
      ...item,
      radar: get(item, 'radar', initialRadarValues)
    },
    enableReinitialize: true,
    onSubmit
  })

  const radarData = useMemo(() => {
    const vals = formik.values.radar
    const data = Object.entries(vals).map(([key, value]) => ({
      prop: decamelize(key),
      value
    }))
    return data
  }, [formik.values.radar])

  return (
    <>
      <Grid container spacing={3}>
        <FormikInput
          sm={4}
          name='user.name'
          label='Name'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.surname'
          label='Surname'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.dateOfBirth'
          label='Date of birth'
          type='date'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.sex'
          label='Sex'
          type='select'
          options={[{ label: 'Male', value: 0 }, { label: 'Female', value: 1 }]}
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.phone'
          label='Phone'
          type='phone'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.email'
          label='Email'
          {...formik}
        />
        <OverallScore style={{ margin: 'auto' }} value={parseInt(meanBy(radarData, 'value'))} />
        <Grid item container xs={12} justify='center'>
          <FormikInput
            sm={4}
            type='select'
            options={playerPhysicalStateOptions}
            name='state'
            label='Physical state'
            required
            sortByLabel={false}
            {...formik}
          />
        </Grid>
        <Grid item xs={12} sm={7} style={{ height: 500 }}>
          <RadarChart data={radarData} />
        </Grid>
        <Grid item container xs={12} sm={5} justify='center'>
          <FormikInput
            type='slider'
            name='radar.speed'
            label='Speed'
            {...formik}
          />
          <FormikInput
            type='slider'
            name='radar.stamina'
            label='Stamina'
            {...formik}
          />
          <FormikInput
            type='slider'
            name='radar.defence'
            label='Defence'
            {...formik}
          />
          <FormikInput
            type='slider'
            name='radar.balance'
            label='Balance'
            {...formik}
          />
          <FormikInput
            type='slider'
            name='radar.ballControl'
            label='Ball control'
            {...formik}
          />
          <FormikInput
            type='slider'
            name='radar.passing'
            label='Passing'
            {...formik}
          />
          <FormikInput
            type='slider'
            name='radar.finishing'
            label='Finishing'
            {...formik}
          />
        </Grid>
        <Grid item xs={12}>
          <FutsalField
            type='outdoor'
            name='positions'
            {...formik} />
        </Grid>
        <Grid item container xs={12} justify='flex-end'>
          {item._id && <Grid item>
            <Button
              style={{ minWidth: 150, color: FutBobPalette.darkRed, marginRight: '1.5em', borderColor: FutBobPalette.darkRed }}
              disabled={formik.isSubmitting}
              onClick={() => setOpenConfirmDialog(true)}
              variant='outlined'>
          Delete
            </Button>
          </Grid>}
          <Grid item>
            <Button
              style={{ minWidth: 150 }}
              disabled={formik.isSubmitting || isEmpty(formik.touched)}
              onClick={formik.handleSubmit}
              variant='contained'
              color='primary'>
              {item._id ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <CustomDialog
        open={!!openConfirmDialog}
        title='Attention!'
        content={<Typography >You are about to delete <span style={{ fontWeight: 'bold' }}>{pageTitle}</span>, continue and delete?</Typography>}
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
    </>
  )
}

export default React.memo(PlayerDetail)
