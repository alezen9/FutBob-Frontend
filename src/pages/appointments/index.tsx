import React from 'react'
import PlayersContainer from '@_page-containers/players/list'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Appointments = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.APPOINTMENTS)

   return (
      <PageTransition>
         hello world appointments
      </PageTransition>
   )
}

export default Appointments
