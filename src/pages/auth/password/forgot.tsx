import React from 'react'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import RequestAccountContainer from '@_page-containers/auth/account/request'

const ForgotPassword = () => {
  zenHooksInstance.useSetActivePage(ZenRouteID.REQUEST_RESET_PASSWORD)

  return (
    <PageTransition>
      <RequestAccountContainer />
    </PageTransition>
  )
}

export default React.memo(ForgotPassword)
