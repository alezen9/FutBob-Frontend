import React, { useMemo, useCallback, useState } from 'react'
import { Grid, Button, Typography, Hidden } from '@material-ui/core'
import FormikInput from '../../../components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, meanBy, get, isEqual } from 'lodash'
import FutsalField from '../../../components/FutsalField'
import { playerPhysicalStateOptions, decamelize, initialScoreValues } from '../../../utils/helpers'
import { OverallScore } from '../../../assets/CustomIcon'
import RadarChart from '../../../components/Charts/Radar'
import { apiInstance } from '../../../SDK'
import { useConfigStore } from '../../../zustand/configStore'
import { ServerMessage } from '../../../utils/serverMessages'
import { FutBobPalette } from '../../../../palette'
import { useRouter } from 'next/router'
import CustomDialog from '../../../components/Dialog'
import { getMeanScoreField } from '../../../components/FormikInput/PlayerScoreInputs/SingleScore'
import PlayerScoreInputs from '../../../components/FormikInput/PlayerScoreInputs'
import { CountryOptions } from '../../../utils/nationalities'
import { useSWRPlayer, useSWRUser } from '../../../../swr'

const PlayerDetail = props => {
  const router = useRouter()
  const { item, trigger } = useSWRPlayer(router.query.id, { revalidateOnMount: !!router.query.id })
  const { item: userConnectedItem, trigger: triggerUserConnected } = useSWRUser({ revalidateOnMount: false })
  const { setIsLoading, openSnackbar, pageTitle } = useConfigStore()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(null)

  const onSubmit = useCallback(
    async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        let done = false
        let userDataChanged = false
        let playerDataChanged = false
        let idPlayer
        const { _id, positions, state, score, user } = values
        const { _id: itemId, positions: itemPositions, state: itemState, score: itemScore, user: itemUser } = item
        const newValsUser = {
          ...user,
          ...user.country && {
            country: get(user, 'country.value', 'IT')
          }
        }
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
            score
          }
          const { country, ...restOfUser } = user
          const { country: itemCountry, ...restOfItemUser } = itemUser
          if (!isEqual(restOfUser, restOfItemUser) || (country && country.value !== itemCountry)) {
            userDataChanged = true
            done = await apiInstance.user_updateUser(newValsUser)
          }
          if (!isEqual(bodyUpdatePlayer, {
            _id: itemId,
            positions: itemPositions,
            state: itemState,
            score: itemScore
          })) {
            playerDataChanged = true
            done = await apiInstance.player_updatePlayer(bodyUpdatePlayer)
          }
        } else {
          const bodyCreate = {
            userData: newValsUser,
            playerData: {
              ...playerData,
              score
            }
          }
          userDataChanged = true
          playerDataChanged = true
          idPlayer = await apiInstance.player_createPlayer(bodyCreate)
        }
        if ((_id && !done) || (!_id && !idPlayer)) throw new Error()
        if (done || idPlayer) {
          if (userDataChanged && get(user, '_id', null) === get(userDataChanged, '_id', null)) {
            triggerUserConnected()
          }
          if (playerDataChanged) trigger()
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
        console.error(error)
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || get(error, 'message', error)
        })
      }
      setIsLoading(false)
      setSubmitting(false)
    }, [item, userConnectedItem, trigger, triggerUserConnected])

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
        if (get(item, 'user._id', null) === get(userConnectedItem, '_id', null)) triggerUserConnected()
        router.replace('/players')
        openSnackbar({
          variant: 'success',
          message: 'Player deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || get(error, 'message', error)
        })
      }
      setIsLoading(false)
    }, [item, triggerUserConnected, userConnectedItem])

  const formik = useFormik({
    initialValues: {
      ...item,
      user: {
        ...get(item, 'user', {}),
        country: CountryOptions.find(({ value }) => value === get(item, 'user.country', 'IT'))
      },
      score: get(item, 'score', initialScoreValues)
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
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
        <FormikInput
          sm={4}
          name='user.country'
          label='Nationality'
          type='autocomplete'
          large
          options={CountryOptions}
          required
          {...formik}
        />
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
        <OverallScore style={{ margin: 'auto' }} value={parseInt(meanBy(scoreData, 'value'))} />
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
          <RadarChart data={scoreData} />
        </Grid>
        <PlayerScoreInputs formik={formik} gridProps={{ sm: 5 }} />
        <Grid item container xs={12} sm={5} justify='center' />
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
