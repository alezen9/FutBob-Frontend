import React, { useMemo } from 'react'
import { Grid } from '@material-ui/core'
import FutsalField from '@_components/FutsalField'
import FormikInput from '@_components/FormikInput'
import RadarChart from '@_components/Charts/Radar'
import { OverallScore } from '@_icons'
import PlayerScoreInputs from '@_components/FormikInput/PlayerScoreInputs'
import { PhysicalStateOpts } from '@_utils/constants/PhysicalStatusOpt'
import { getPlayerOverall } from '@_utils/playerOverall'
import { Player } from '@_SDK_Player/types'
import { useFormik } from 'formik'

type Props = {
   item: Player
}

const _Skills: React.FC<Props> = props => {
   const { item: { user, ...player } } = props

   const formik = useFormik({
      initialValues: player,
      enableReinitialize: true,
      onSubmit: () => {}
   })

  const { overall, chartData } = useMemo(() => {
    const { score, positions = [] } = formik.values
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
    </Grid>
  )
}

export default React.memo(_Skills)
