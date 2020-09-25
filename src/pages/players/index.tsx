import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageTransition from '@_components/PageTransition'
import PlayersContainer from '@_page-containers/players'

const Players = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/players/create')
  }, [])
  return (
    <PageTransition>
      <PlayersContainer />
    </PageTransition>
  )
}

export default React.memo(Players)
