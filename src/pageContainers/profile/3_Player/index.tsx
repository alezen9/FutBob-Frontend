import React, { useCallback, useMemo } from 'react'
import { Grid, Button } from '@material-ui/core'
import { get, meanBy, isEmpty } from 'lodash'
import FutsalField from '../../../components/FutsalField'
import { useFormik } from 'formik'
import FormikInput from '../../../components/FormikInput'
import { playerPhysicalStateOptions, decamelize, initialScoreValues } from '../../../utils/helpers'
import { apiInstance } from '../../../SDK'
import { ServerMessage } from '../../../utils/serverMessages'
import RadarChart from '../../../components/Charts/Radar'
import { OverallScore } from '../../../assets/CustomIcon'
import { getMeanScoreField } from '../../../components/FormikInput/PlayerScoreInputs/SingleScore'
import PlayerScoreInputs from '../../../components/FormikInput/PlayerScoreInputs'

const Player = props => {
  const { item: { _id: userId, futsalPlayer }, setIsLoading, mutate, openSnackbar } = props

  const onSubmit = useCallback(
    async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        let done = false
        let idPlayer
        const { _id, positions, state, score } = values
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
          mutate(state => {
            state.futsalPlayer = { _id: _id || idPlayer, ...playerData, score }
          })
          openSnackbar({
            variant: 'success',
            message: _id
              ? 'Player info updated successfully!'
              : 'Player created successfully'
          })
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
    }, [userId, futsalPlayer])

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
