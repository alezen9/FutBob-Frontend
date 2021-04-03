import React from 'react'
import MeContainer from '@_page-containers/me'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Me = () => {
  zenHooks.app.useSetActivePage(ZenRouteID.ME)

  return (
    <PageTransition>
      <MeContainer />
    </PageTransition>
  )
}

export default Me
