import React, { useEffect } from 'react'
import PageTransition from '@_components/PageTransition'
import FieldDetail from '@_page-containers/fields/show'
import { useConfigStore } from '@_zustand/configStore'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import GoBack from '@_components/GoBack'
import { useSWRField } from '@_swr/Fields'

const Field = () => {
  const router = useRouter()
  const { id }: { id?: string } = router.query
  const setPageTitle = useConfigStore(state => state.setPageTitle)

  const { item } = useSWRField(id, { fromCache: true })

  useEffect(() => {
    const pageTitle = item._id
      ? get(item, 'name', 'Unknown field')
      : 'Create field'
    setPageTitle(pageTitle)
  }, [item._id])

  return (
    <PageTransition>
      <>
        <GoBack route='/fields?page=1' />
        <FieldDetail />
      </>
    </PageTransition>
  )
}

export default React.memo(Field)