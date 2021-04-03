import React from 'react'
import PlayersContainer from '@_page-containers/players/list'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Players = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.PLAYERS)

   return (
      <PageTransition>
         <PlayersContainer />
      </PageTransition>
   )
}

export default Players
