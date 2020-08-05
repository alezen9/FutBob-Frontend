import React, { useRef, useEffect } from 'react'
import PlayersContainer from '../pageContainers/players'
import { apiInstance } from '../SDK'
import PageTransition from '../components/PageTransition'

const Players = props => {
  const isMounted = useRef(true)
  useEffect(() => {
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

export default Players
