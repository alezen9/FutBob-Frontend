import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageTransition from '@_components/PageTransition'
import FreeAgentsContainer from '@_page-containers/freeAgents'

const FreeAgents = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/free-agents/create')
  }, [])
  return (
    <PageTransition>
      <FreeAgentsContainer />
    </PageTransition>
  )
}

export default React.memo(FreeAgents)
