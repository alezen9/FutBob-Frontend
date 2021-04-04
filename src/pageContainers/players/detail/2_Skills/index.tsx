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
import { ZenPalette } from '@_MUITheme'
import ZenDialog from '@_components/ZenDialog'
import { PhysicalStateOpts } from '@_utils/constants/PhysicalStatusOpt'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { getPlayerOverall } from '@_utils/playerOverall'
import { onUpdatePlayerSkills, schema } from './helpers'
import { useRouter } from 'next/router'
import { ZenRouteID } from '@_utils/routes/types'
import { routesPaths } from '@_utils/routes'
import zenHooks from '@_utils/hooks'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'

const _Skills: React.FC<TabProps> = props => {
   const { item, setIsLoading, isMe, updatePlayerSkills, deletePlayer } = props
   const { user, ...player } = item
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
   const router = useRouter()
   const isMounted = zenHooks.utils.useIsMounted()

   const onDelete = useCallback(async () => {
      setIsLoading(true)
      if (get(player, '_id', null)) {
         await deletePlayer(get(player, '_id', null), isMe)
         router.replace(routesPaths[ZenRouteID.PLAYERS].path)
      }
      if (isMounted.current) setOpenConfirmDialog(false)
      setIsLoading(false)
   }, [get(player, '_id', null), deletePlayer, isMe, setIsLoading])

   const formik = useFormik({
      initialValues: {
         _id: get(player, '_id', null),
         positions: get(player, 'positions', []),
         state: get(player, 'state', undefined),
         score: get(player, 'score', initialScoreValues)
      },
      enableReinitialize: true,
      validationSchema: schema,
      onSubmit: onUpdatePlayerSkills({ setIsLoading, updatePlayerSkills, isMe })
   })

   const { overall, chartData } = useMemo(() => {
      const { score, positions } = formik.values
      const { overall, chartData } = getPlayerOverall(score, positions)
      return { overall, chartData }
   }, [JSON.stringify(formik.values.score), JSON.stringify(formik.values.positions)])

   return (
      <Grid container spacing={3}>
         <OverallScore style={{ margin: 'auto' }} value={overall} size={4} />
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
         <Grid item xs={12} md={7} style={{ height: 500 }}>
            <RadarChart data={chartData} />
         </Grid>
         <PlayerScoreInputs formik={formik} name='score' gridProps={{ sm: 12, md: 5 }} />
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
         <WarningDeleteDialog
            open={!!openConfirmDialog}
            text={< >You are about to delete <span style={{ fontWeight: 'bold', color: ZenPalette.error }}>{isMe ? 'yourself' : `${get(item, 'user.registry.surname', '')} ${get(item, 'user.registry.name', '')}`}</span>, continue and delete?</>}
            onClose={() => setOpenConfirmDialog(false)}
            onDelete={onDelete}
         />
      </Grid>
   )
}

export default React.memo(_Skills)
