import React from 'react'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import RequestAccountContainer from '@_page-containers/auth/account/request'

const RequestAccount = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.REQUEST_ACCOUNT)

   return (
      <PageTransition>
         <RequestAccountContainer />
      </PageTransition>
   )
}

export default React.memo(RequestAccount)
