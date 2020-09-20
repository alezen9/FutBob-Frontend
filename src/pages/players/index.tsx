import React, { useRef, useEffect } from 'react'
import PlayersContainer from '../../pageContainers/players'
import PageTransition from '../../components/PageTransition'
import { useRouter } from 'next/router'
import { apiInstance } from '../../SDK'
import { allPlayerFields } from '../../SDK/allFields'
import { NextPageContext } from 'next'

const Players = props => {
  const isMounted = useRef(true)
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/players/create')
    router.prefetch('/players/[id]')
    return () => {
      isMounted.current = false
    }
  }, [])
  return (
    <PageTransition>
      <PlayersContainer
        {...props}
        isMounted={isMounted.current} />
    </PageTransition>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const players = await apiInstance.player_getPlayers({}, allPlayerFields)
  return {
    props: { players }
  }
}

export default React.memo(Players)
