import React, { useEffect } from 'react'
import CreateDetailField from '@_page-containers/fields/create-detail'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import { useRouter } from 'next/router'
import { useSWRField } from '@_swr/Fields'
import { useConfigStore } from '@_zustand/config'
import { get } from 'lodash'

const DetailField = () => {
   const router = useRouter()
   const { _id } = router.query
   const { item } = useSWRField(_id as string)
   zenHooksInstance.useSetActivePage(ZenRouteID.FIELDS_DETAIL)
   const setPageTitle = useConfigStore(state => state.setPageTitle)

  useEffect(() => {
     if(item._id){
        setPageTitle(get(item, 'name', ''))
     }
  }, [setPageTitle, item._id])

  return (
    <PageTransition>
      <CreateDetailField />
    </PageTransition>
  )
}

export default DetailField
