import React, { useRef, useEffect } from 'react'
import PageTransition from '../../components/PageTransition'
import PlayerDetail from '../../pageContainers/players/show'
import { useConfigStore } from '@_zustand/configStore'
import GoBack from '../../components/GoBack'

const CreatePlayer = props => {
  const isMounted = useRef(true)
  const setPageTitle = useConfigStore(state => state.setPageTitle)

  useEffect(() => {
    setPageTitle('Create new player')
  }, [])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <PageTransition>
      <>
        <GoBack route='/players?page=1' />
        <PlayerDetail
          {...props}
          isMounted={isMounted.current} />
        </>
    </PageTransition>
  )
}

export default React.memo(CreatePlayer)
