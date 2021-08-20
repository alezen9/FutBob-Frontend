import React, { useCallback, useEffect, useState } from 'react'
import { Grid, Button, useMediaQuery, useTheme } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, get, values } from 'lodash'
import { ZenPalette } from '@_MUITheme'
import { useRouter } from 'next/router'
import { useSWRField } from '@_swr/Fields'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import FutsalField from '@_components/FutsalField'
import { ConfigStore } from '@_zustand/config/helpers'
import { useConfigStore } from '@_zustand/config'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { FieldState, FieldType } from '@_SDK_Field/types'
import zenToolbox from '@_utils/toolbox'
import { FieldTurfTypeOpts } from '@_utils/constants/FieldTurfTypeOpts'
import zenHooks from '@_utils/hooks'
import { useSWRAppointment } from '@_swr/Appointments'
import ZenTabs, { ZenTab } from '@_components/ZenTabs'
import _MainInfo from './1_MainInfo'
import _Invites from './2_Invites'
import _Stats from './4_Stats'
import { useMemo } from 'react'
import _Matches from './3_Matches'
import FingerprintRoundedIcon from '@material-ui/icons/FingerprintRounded'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded'

const stateSelector = (state: ConfigStore) => ({
   setIsLoading: state.setIsLoading
})

const CreateAppointmentContainer = () => {
   const router = useRouter()
   const { _id } = router.query
   const { item } = useSWRAppointment(_id as string)
   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
   const { setIsLoading } = useConfigStore(stateSelector)
   const isMounted = zenHooks.utils.useIsMounted()

   const replaceRouteWithID = useCallback((_id: string) => {
      router.replace(routesPaths[ZenRouteID.APPOINTMENT_DETAIL].path, routesPaths[ZenRouteID.APPOINTMENT_DETAIL].as({ _id }))
   }, [])

   const formik = useFormik({
      initialValues: {},
      enableReinitialize: true,
      onSubmit: values => console.log(values)
   })

   console.log(item)

   const { tabMainInfo, tabInvites, tabMatches, tabStats } = useMemo(() => {
      return {
         tabMainInfo: {},
         tabInvites: {},
         tabMatches: {},
         tabStats: {}
      }
   }, [])

   return (
      <Grid container justify='center' style={{ marginTop: '2em' }}>
         <ZenTabs>
            <ZenTab
               title='Main info'
               icon={<FingerprintRoundedIcon />}
               component={<_MainInfo {...tabMainInfo} />}
            />
            <ZenTab
               title='Invites'
               icon={<SendRoundedIcon />}
               component={<_Invites {...tabInvites} />}
            />
            <ZenTab
               title='Matches'
               icon={<SportsSoccerRoundedIcon />}
               component={<_Matches {...tabMatches} />}
            />
            <ZenTab
               title='Stats'
               icon={<EqualizerRoundedIcon />}
               component={<_Stats {...tabStats} />}
            />
         </ZenTabs>
      </Grid>
   )
}

export default React.memo(CreateAppointmentContainer)
