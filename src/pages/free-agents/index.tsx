import React from 'react'
import FreeAgentsContainer from '@_page-containers/freeAgents'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const FreeAgents = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.FREE_AGENTS)

   return (
      <PageTransition>
         <FreeAgentsContainer />
      </PageTransition>
   )
}

export default FreeAgents
