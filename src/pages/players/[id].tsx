import React, { useRef, useEffect, useCallback } from 'react'
import PageTransition from '../../components/PageTransition'
import PlayerDetail from '../../pageContainers/players/show'
import { useConfigStore } from '../../zustand/configStore'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import GoBack from '../../components/GoBack'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
import { useSWRUser, useSWRPlayer } from '../../swr'
import { User } from '../../Entities/User'

export const getPlayerPageTitle = (user: User, isUser: boolean = false) => {
  const { name, surname } = user
  return isUser
    ? <span style={{display: 'flex', alignItems: 'center'}}>
      <FaceRoundedIcon style={{marginRight: '.5em', fontSize: '1.2em' }}/>
      {`${surname} ${name}`}
    </span>
    : `${surname} ${name}`
}


const Player = props => {
  const isMounted = useRef(true)
  const router = useRouter()
  const { id }: { id?: string } = router.query
    const setPageTitle = useConfigStore(state => state.setPageTitle)

  const { item: player } = useSWRPlayer(id, { revalidateOnMount:false })
  const { item: user } = useSWRUser({ revalidateOnMount: false })

  useEffect(() => {
    const _isUser = get(user, '_id', null) === get(player, 'user._id', null)
    const pageTitle = getPlayerPageTitle(get(player, 'user', {} as User), _isUser)
    setPageTitle(pageTitle)
  }, [player._id, user._id])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <PageTransition>
      <>
      <GoBack route='/players' />
      <PlayerDetail
        {...props}
        isMounted={isMounted.current} />
        </>
    </PageTransition>
  )
}

export default React.memo(Player)