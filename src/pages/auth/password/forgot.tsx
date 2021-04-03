import React from 'react'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import ForgotPasswordContainter from '@_page-containers/auth/password/forgot'

const ForgotPassword = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.REQUEST_RESET_PASSWORD)

   return (
      <PageTransition>
         <ForgotPasswordContainter />
      </PageTransition>
   )
}

export default React.memo(ForgotPassword)
