import React from 'react'
import DetailPlayerContainer from '@_page-containers/players/detail'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const DetailPlayer = () => {
  zenHooksInstance.useSetActivePage(ZenRouteID.PLAYER_DETAIL)

  return (
    <PageTransition>
      <DetailPlayerContainer />
    </PageTransition>
  )
}

export default DetailPlayer
