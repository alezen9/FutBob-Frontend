import React, { useCallback, useMemo, useState } from 'react'
import { Grid, Button, Typography, useTheme, useMediaQuery } from '@material-ui/core'
import { get, isEmpty } from 'lodash'
import FutsalField from '@_components/FutsalField'
import { useFormik } from 'formik'
import FormikInput from '@_components/FormikInput'
import RadarChart from '@_components/Charts/Radar'
import { OverallScore } from '@_icons'
import PlayerScoreInputs from '@_components/FormikInput/PlayerScoreInputs'
import { TabProps } from '..'
import { ZenPalette } from '@_palette'
import ZenDialog from '@_components/ZenDialog'
import { PhysicalStateOpts } from '@_utils/constants/PhysicalStatusOpt'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { getPlayerOverall } from '@_utils/playerOverall'
import { onSubmit, schema } from './helpers'
import { zenHooksInstance } from '@_utils/hooks'

const Player: React.FC<TabProps> = props => {
  const { item, setIsLoading, createMyPlayer, updateMyPlayer, deleteMyPlayer } = props
  const { _id: userID, player } = item
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const isMounted = zenHooksInstance.useIsMounted()

  const onDelete = useCallback(async () => {
     setIsLoading(true)
     if(get(player, '_id', null)) await deleteMyPlayer(get(player, '_id', null))
     if(isMounted.current) setOpenConfirmDialog(false)
     setIsLoading(false)
  }, [get(player, '_id', null), deleteMyPlayer, setIsLoading])

  const formik = useFormik({
    initialValues: {
      _id: get(player, '_id', null),
      user: userID,
      positions: get(player, 'positions', []),
      state: get(player, 'state', undefined),
      score: get(player, 'score', initialScoreValues)
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: onSubmit({ setIsLoading, createMyPlayer, updateMyPlayer })
  })

  const { overall, chartData } = useMemo(() => {
    const { score, positions } = formik.values
    const { overall, chartData } = getPlayerOverall(score, positions)
    return { overall, chartData }
  }, [JSON.stringify(formik.values.score), JSON.stringify(formik.values.positions)])

  return (
    <Grid container spacing={3}>
      <OverallScore style={{ margin: 'auto' }} value={overall} />
      <Grid item container xs={12} justify='center'>
        <FormikInput
          sm={4}
          type='select'
          options={PhysicalStateOpts}
          name='state'
          required
          label='Physical state'
          sortByLabel={false}
          {...formik}
        />
      </Grid>
      <Grid item xs={12} sm={7} style={{ height: 500 }}>
        <RadarChart data={chartData} />
      </Grid>
      <PlayerScoreInputs formik={formik} name='score' gridProps={{ sm: 5 }} />
      <Grid item xs={12}>
        <FutsalField
          type='outdoor'
          name='positions'
          hideSwitch
          {...formik} />
      </Grid>
      <Grid item container xs={12} justify={isSmallScreen ? 'space-evenly' : 'flex-end'}>
        {get(player, '_id', null) && <Grid item>
          <Button
            style={{ minWidth: 130, color: ZenPalette.error, marginRight: '1.5em', borderColor: ZenPalette.error }}
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
            {player ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Grid>
      <ZenDialog
        open={!!openConfirmDialog}
        fullScreen={false}
        title='Attention!'
        content={<Typography >You are about to delete <span style={{ fontWeight: 'bold', color: ZenPalette.error }}>Yourself</span>, continue and delete?</Typography>}
        actions={
          <Button
            style={{ minWidth: 150, backgroundColor: ZenPalette.error }}
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
