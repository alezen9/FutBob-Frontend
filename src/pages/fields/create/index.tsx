import React from 'react'
import CreateDetailField from '@_page-containers/fields/create-detail'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const CreateField = () => {
  zenHooksInstance.useSetActivePage(ZenRouteID.FIELDS_CREATE)

  return (
    <PageTransition>
      <CreateDetailField />
    </PageTransition>
  )
}

export default CreateField
