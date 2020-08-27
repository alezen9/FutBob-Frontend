import React, { useRef, useEffect } from 'react'
import ProfileContainer from '../pageContainers/profile'
import PageTransition from '../components/PageTransition'

const Profile = props => {
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

export default Profile
