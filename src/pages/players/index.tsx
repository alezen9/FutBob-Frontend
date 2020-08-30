import React, { useRef, useEffect } from 'react'
import PlayersContainer from '../../pageContainers/players'
import PageTransition from '../../components/PageTransition'
import { useRouter } from 'next/router'
import { apiInstance } from '../../SDK'
import { playerFields } from '../../swr/helpers'

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

export const getStaticProps = async ctx => {
  const players = await apiInstance.player_getPlayers({}, playerFields)
  return {
    props: { players }
  }
}

export default React.memo(Players)
