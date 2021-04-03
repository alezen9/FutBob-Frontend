import React from 'react'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import ResetPasswordContainer from '@_page-containers/auth/password/reset'

const ResetPassword = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.FINALIZE_RESET_PASSWORD)

   return (
      <PageTransition>
         <ResetPasswordContainer />
      </PageTransition>
   )
}

export default React.memo(ResetPassword)
