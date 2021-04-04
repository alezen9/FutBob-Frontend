import React, { useMemo } from 'react'
import { Grid } from '@material-ui/core'
import FutsalField from '@_components/FutsalField'
import FormikInput, { FormikEssentials } from '@_components/FormikInput'
import RadarChart from '@_components/Charts/Radar'
import { OverallScore } from '@_icons'
import PlayerScoreInputs from '@_components/FormikInput/PlayerScoreInputs'
import { PhysicalStateOpts } from '@_utils/constants/PhysicalStatusOpt'
import { getPlayerOverall } from '@_utils/playerOverall'

type Props = {
   formik: FormikEssentials
}

const _Skills: React.FC<Props> = props => {
   const { formik } = props

   const { overall, chartData } = useMemo(() => {
      const { player: { score, positions = [] } } = formik.values
      const { overall, chartData } = getPlayerOverall(score, positions)
      return { overall, chartData }
   }, [JSON.stringify(formik.values.player.score), JSON.stringify(formik.values.player.positions)])

   return (
      <Grid container spacing={3}>
         <OverallScore style={{ margin: 'auto' }} value={overall} />
         <Grid item container xs={12} justify='center'>
            <FormikInput
               sm={4}
               type='select'
               options={PhysicalStateOpts}
               name='player.state'
               required
               label='Physical state'
               sortByLabel={false}
               {...formik}
            />
         </Grid>
         <Grid item xs={12} md={7} style={{ height: 500 }}>
            <RadarChart data={chartData} />
         </Grid>
         <PlayerScoreInputs formik={formik} name='player.score' gridProps={{ sm: 12, md: 5 }} />
         <Grid item xs={12}>
            <FutsalField
               type='outdoor'
               name='player.positions'
               hideSwitch
               {...formik} />
         </Grid>
      </Grid>
   )
}

export default React.memo(_Skills)
