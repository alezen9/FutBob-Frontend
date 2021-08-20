import React from 'react'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import CreateAppointmentContainer from '@_page-containers/appointments/create-detail'

const DetailPlayer = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.APPOINTMENT_DETAIL)

   return (
      <PageTransition>
         <CreateAppointmentContainer />
      </PageTransition>
   )
}

export default DetailPlayer
