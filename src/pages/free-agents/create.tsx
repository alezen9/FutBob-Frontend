import React, { useRef, useEffect } from 'react'
import PageTransition from '@_components/PageTransition'
import FreeAgentDetail from '@_page-containers/freeAgents/show'
import { useConfigStore } from '@_zustand/configStore'
import GoBack from '@_components/GoBack'

const CreateField = props => {
  const isMounted = useRef(true)
  const setPageTitle = useConfigStore(state => state.setPageTitle)

  useEffect(() => {
    setPageTitle('Create new free agent')
  }, [])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <PageTransition>
      <>
        <GoBack route='/free-agents?page=1' />
        <FreeAgentDetail
          {...props}
          isMounted={isMounted.current} />
        </>
    </PageTransition>
  )
}

export default React.memo(CreateField)
