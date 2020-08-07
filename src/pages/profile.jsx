import React, { useRef, useEffect } from 'react'
import ProfileContainer from '../pageContainers/profile'
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
      <ProfileContainer
        {...props}
        isMounted={isMounted.current} />
    </PageTransition>
  )
}

export default Players
