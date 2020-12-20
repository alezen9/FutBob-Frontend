import React, { useEffect } from 'react'
import PageTransition from '@_components/PageTransition'
import FreeAgentDetail from '@_page-containers/freeAgents/show'
import { useConfigStore } from '@_zustand/configStore'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import GoBack from '@_components/GoBack'
import { useSWRFreeAgent } from '@_swr/FreeAgent'

const Field = () => {
  const router = useRouter()
  const { id }: { id?: string } = router.query
  const setPageTitle = useConfigStore(state => state.setPageTitle)

  const { item } = useSWRFreeAgent(id, { fromCache: true })

  useEffect(() => {
    const pageTitle = item._id
      ? `${get(item, 'surname', '')} ${get(item, 'name', '')}`
      : 'Create free agent'
    setPageTitle(pageTitle)
  }, [item._id])

  return (
    <PageTransition>
      <>
        <GoBack route='/free-agents?page=1' />
        <FreeAgentDetail />
      </>
    </PageTransition>
  )
}

export default React.memo(Field)