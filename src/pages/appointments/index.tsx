import React from 'react'
import AppointmentsContainer from '@_page-containers/appointments/list'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Appointments = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.APPOINTMENTS)

   return (
      <PageTransition>
         <AppointmentsContainer />
      </PageTransition>
   )
}

export default Appointments
