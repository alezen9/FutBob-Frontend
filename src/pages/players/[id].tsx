import React, { useRef, useEffect, useCallback } from 'react'
import PageTransition from '@_components/PageTransition'
import PlayerDetail from '@_page-containers/players/show'
import { useConfigStore } from '@_zustand/configStore'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import GoBack from '@_components/GoBack'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
import { User } from '@_entities/User'
import { useSWRPlayer } from '@_swr/Players'
import { useSWRUser } from '@_swr/User'

export const getPlayerPageTitle = (user: User, isUser: boolean = false) => {
  const { name, surname } = user
  return isUser
    ? <span style={{display: 'flex', alignItems: 'center'}}>
      <FaceRoundedIcon style={{marginRight: '.5em', fontSize: '1.2em' }}/>
      {`${surname} ${name}`}
    </span>
    : `${surname} ${name}`
}


const Player = () => {
  const router = useRouter()
  const { id }: { id?: string } = router.query
  const setPageTitle = useConfigStore(state => state.setPageTitle)

  const { item: playerItem } = useSWRPlayer(id, { fromCache: true })
  const { item: userItem } = useSWRUser({ fromCache: true, revalidateOnMount: false })

  useEffect(() => {
    const _isUser = get(userItem, '_id', null) === get(playerItem, 'user._id', null)
    const pageTitle = getPlayerPageTitle(get(playerItem, 'user', {} as User), _isUser)
    setPageTitle(pageTitle)
  }, [playerItem._id, userItem._id])

  return (
    <PageTransition>
      <>
        <GoBack route='/players' />
        <PlayerDetail />
      </>
    </PageTransition>
  )
}

export default React.memo(Player)