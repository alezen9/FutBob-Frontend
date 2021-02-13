import React from 'react'
import CreatePlayerContainer from '@_page-containers/players/create'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const CreatePlayer = () => {
  zenHooksInstance.useSetActivePage(ZenRouteID.PLAYER_CREATE)

  return (
    <PageTransition>
      <CreatePlayerContainer />
    </PageTransition>
  )
}

export default CreatePlayer
