import React from 'react'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import FinalizeAccountContainer from '@_page-containers/auth/account/finalize'

const FinalizeAccount = () => {
  zenHooksInstance.useSetActivePage(ZenRouteID.FINALIZE_ACCOUNT)

  return (
    <PageTransition>
      <FinalizeAccountContainer />
    </PageTransition>
  )
}

export default React.memo(FinalizeAccount)
