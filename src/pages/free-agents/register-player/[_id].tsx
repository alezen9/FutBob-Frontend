import React from 'react'
import RegisterFreeAgentAsPlayerContainer from '@_page-containers/freeAgents/registerAsPlayer'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const RegisterFreeAgentAsPlayer = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.FREE_AGENT_REGISTER_PLAYER)

   return (
      <PageTransition>
         <RegisterFreeAgentAsPlayerContainer />
      </PageTransition>
   )
}

export default RegisterFreeAgentAsPlayer
