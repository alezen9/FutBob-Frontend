import React, { useRef, useEffect } from 'react'
import MatchesContainer from '../pageContainers/matches'
import { apiInstance } from '../SDK'
import PageTransition from '../components/PageTransition'
import { sortBy } from 'lodash'

const Matches = props => {
  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])
  return (
    <PageTransition>
      <MatchesContainer
        {...props}
        isMounted={isMounted.current} />
    </PageTransition>
  )
}

// export const getStaticProps = async () => {
//   const res = await apiInstance.
//   const posts = await res.json()

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }

export default Matches
