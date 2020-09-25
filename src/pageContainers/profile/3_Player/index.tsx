import React, { useCallback, useMemo } from 'react'
import { Grid, Button } from '@material-ui/core'
import { get, meanBy, isEmpty } from 'lodash'
import FutsalField from '@_components/FutsalField'
import { useFormik } from 'formik'
import FormikInput from '@_components/FormikInput'
import { playerPhysicalStateOptions, decamelize, initialScoreValues } from '@_utils/helpers'
import { apiInstance } from 'src/SDK'
import { ServerMessage } from '@_utils/serverMessages'
import RadarChart from '@_components/Charts/Radar'
import { OverallScore } from '@_icons'
import { getMeanScoreField } from '@_components/FormikInput/PlayerScoreInputs/SingleScore'
import PlayerScoreInputs from '@_components/FormikInput/PlayerScoreInputs'
import { ProfileTabProps } from '..'
import { EditablePlayer, PhysicalState, PlayerPosition, PlayerType } from '@_myentities/Player'
import { useSWRPlayers } from '@_swr/hooks'

const Player = (props: ProfileTabProps) => {
  const { item: { _id: userId, futsalPlayer, ...restOfUserData }, setIsLoading, mutate, openSnackbar } = props
  const { mutate: mutatePlayerList } = useSWRPlayers({ revalidateOnMount: false })

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        let done = false
        let idPlayer
        const { _id, positions, state, score }: EditablePlayer = values
        if (!positions || !positions.length || [null, undefined].includes(state)) {
          const err = 'player_fields_required'
          throw err
        }
        const playerData = {
          type: PlayerType.Futsal,
          positions,
          state
        }
        if (_id) {
          const bodyUpdate = {
            _id,
            positions,
            state,
            score
          }
          done = await apiInstance.player_updatePlayer(bodyUpdate)
        } else {
          const bodyCreate = {
            userId,
            playerData: {
              ...playerData,
              score
            }
          }
          idPlayer = await apiInstance.player_createPlayer(bodyCreate)
        }
        if ((_id && !done) || (!_id && !idPlayer)) throw new Error()
        if (done || idPlayer) {
          const mePlayer = { _id: _id || idPlayer, ...playerData, score }
          mutate(draft => {
            draft.futsalPlayer = mePlayer
          })
          mutatePlayerList(draft => {
            if((draft || []).length){
              const idx = draft.findIndex(player => player._id === mePlayer._id)
              if(![null, undefined].includes(idx)) draft[idx] = {
                ...mePlayer,
                user: {
                  _id: userId,
                  ...restOfUserData
                }
              }
            }
          })
          openSnackbar({
            variant: 'success',
            message: _id
              ? 'Player info updated successfully!'
              : 'Player created successfully'
          })
        }
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || get(error, 'message', error)
        })
      }
      setIsLoading(false)
      setSubmitting(false)
    }, [restOfUserData, userId, futsalPlayer, mutatePlayerList])

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
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{ minWidth: 150 }}
          disabled={formik.isSubmitting || isEmpty(formik.touched)}
          onClick={() => formik.handleSubmit()}
          variant='contained'
          color='primary'>
          {futsalPlayer ? 'Update' : 'Create'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default React.memo(Player)
