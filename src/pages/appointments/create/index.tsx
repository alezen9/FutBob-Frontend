import React from 'react'
import CreateAppointmentContainer from '@_page-containers/appointments/create-detail'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const CreateAppointment = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.APPOINTMENT_CREATE)

   return (
      <PageTransition>
         <CreateAppointmentContainer />
      </PageTransition>
   )
}

export default CreateAppointment
