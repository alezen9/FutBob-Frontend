import React from 'react'
import FieldsContainer from '@_page-containers/fields/list'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Fields = () => {
   zenHooks.app.useSetActivePage(ZenRouteID.FIELDS)

   return (
      <PageTransition>
         <FieldsContainer />
      </PageTransition>
   )
}

export default Fields
