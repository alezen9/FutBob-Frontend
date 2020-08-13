import React, { useCallback, useMemo } from 'react'
import { Grid, Button } from '@material-ui/core'
import { get, meanBy } from 'lodash'
import FutsalField from '../../../components/FutsalField'
import { useFormik } from 'formik'
import FomrikInput from '../../../components/FomrikInput'
import { playerPhysicalStateOptions, decamelize } from '../../../utils/helpers'
import { apiInstance } from '../../../SDK'
import { ServerMessage } from '../../../utils/serverMessages'
import RadarChart from '../../../components/Charts/Radar'
import { OverallScore } from '../../../assets/CustomIcon'

const initialRadarValues = {
  speed: 0,
  stamina: 0,
  defence: 0,
  balance: 0,
  ballControl: 0,
  passing: 0,
  finishing: 0
}

const Player = props => {
  const { item: { _id: userId, futsalPlayer }, setIsLoading, setItem, openSnackbar } = props

  const onSubmit = useCallback(
    async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        let done = false
        let idPlayer
        const { _id, positions, state, radar } = values
        if (!positions.length || [null, undefined].includes(state)) {
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
            radarData: radar
          }
          done = await apiInstance.player_updatePlayer(bodyUpdate)
        } else {
          const bodyCreate = {
            userId,
            playerData: {
              ...playerData,
              radarData: radar
            }
          }
          idPlayer = await apiInstance.player_createPlayer(bodyCreate)
        }
        if ((_id && !done) || (!_id && !idPlayer)) throw new Error()
        if (done || idPlayer) {
          setItem({ futsalPlayer: { _id: _id || idPlayer, ...playerData, radar } })
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
          message: ServerMessage[error] || ServerMessage.generic
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
      radar: get(futsalPlayer, 'radar', initialRadarValues)
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
    <Grid container spacing={3}>
      <OverallScore style={{ margin: 'auto' }} value={parseInt(meanBy(radarData, 'value'))} />
      <Grid item container xs={12} justify='center'>
        <FomrikInput
          sm={4}
          type='select'
          options={playerPhysicalStateOptions}
          name='state'
          label='Physical state'
          sortByLabel={false}
          {...formik}
        />
      </Grid>
      <Grid item xs={12} sm={7} style={{ height: 500 }}>
        <RadarChart data={radarData} />
      </Grid>
      <Grid item container xs={12} sm={5} justify='center'>
        <FomrikInput
          type='slider'
          name='radar.speed'
          label='Speed'
          {...formik}
        />
        <FomrikInput
          type='slider'
          name='radar.stamina'
          label='Stamina'
          {...formik}
        />
        <FomrikInput
          type='slider'
          name='radar.defence'
          label='Defence'
          {...formik}
        />
        <FomrikInput
          type='slider'
          name='radar.balance'
          label='Balance'
          {...formik}
        />
        <FomrikInput
          type='slider'
          name='radar.ballControl'
          label='Ball control'
          {...formik}
        />
        <FomrikInput
          type='slider'
          name='radar.passing'
          label='Passing'
          {...formik}
        />
        <FomrikInput
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
      <Grid item xs={12} align='right'>
        <Button
          style={{ minWidth: 150 }}
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
          variant='contained'
          color='primary'>
          {futsalPlayer ? 'Update' : 'Create'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default React.memo(Player)
