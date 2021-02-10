import React from 'react'
import PlayersContainer from '@_page-containers/players/list'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Players = () => {
  zenHooksInstance.useSetActivePage(ZenRouteID.PLAYERS)

  return (
    <PageTransition>
      <PlayersContainer />
    </PageTransition>
  )
}

export default Players
