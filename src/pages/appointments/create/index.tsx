import React from 'react'
import CreatePlayerContainer from '@_page-containers/players/create'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const CreatePlayer = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.APPOINTMENT_CREATE)

   return (
      <PageTransition>
         hello world appointment create
      </PageTransition>
   )
}

export default CreatePlayer
