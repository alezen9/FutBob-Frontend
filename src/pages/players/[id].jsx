import React, { useRef, useEffect, useCallback } from 'react'
import PageTransition from '../../components/PageTransition'
import PlayerDetail from '../../pageContainers/players/show'
import { useConfigStore } from '../../zustand/configStore'
import { usePlayerStore } from '../../zustand/playersStore'
import {useUserStore} from '../../zustand/userStore'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import GoBack from '../../components/GoBack'
import { ServerMessage } from '../../utils/serverMessages'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'


const Player = props => {
  const isMounted = useRef(true)
  const router = useRouter()
  const { id } = router.query
    const { setPageTitle, openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading,
    setPageTitle: state.setPageTitle
  }))
  const item = useUserStore(state => state.item)
  const { name, surname, resetItem, getItem, userId } = usePlayerStore(state => ({
    userId: get(state, 'item.user._id', null),
    name: get(state, 'item.user.name', ''),
    surname: get(state, 'item.user.surname', ''),
    resetItem: state.resetItem,
    getItem: state.getItem
  }))

  const getData = useCallback(
    async () => {
      if(id && id !== '[id]' && !name){
        setIsLoading(true)
        try {
          await getItem(id)
        } catch (error) {
          openSnackbar({
            variant: 'error',
            message: ServerMessage[error] || get(error, 'message', error)
          })
        }
        setIsLoading(false)
      }
    }, [id, name])

    useEffect(() => {
      getData()
    }, [getData])

  useEffect(() => {
    return () => {
      resetItem()
    }
  }, [resetItem])

  useEffect(() => {
    const _isUser = userId === item._id
    const pageTitle = _isUser
    ? <span style={{display: 'flex', alignItems: 'center'}}>
      <FaceRoundedIcon style={{marginRight: '.5em', fontSize: '1.2em' }}/>
      {`${surname} ${name}`}
    </span>
    : `${surname} ${name}`
  setPageTitle(pageTitle)
  }, [name, surname, userId, item._id])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <PageTransition>
      <GoBack route='/players' />
      <PlayerDetail
        {...props}
        isMounted={isMounted.current} />
    </PageTransition>
  )
}

export default React.memo(Player)