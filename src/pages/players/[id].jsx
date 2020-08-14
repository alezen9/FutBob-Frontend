import React, { useRef, useEffect, useCallback } from 'react'
import PageTransition from '../../components/PageTransition'
import PlayerDetail from '../../pageContainers/players/show'
import { useConfigStore } from '../../zustand/configStore'
import { usePlayerStore } from '../../zustand/playersStore'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import GoBack from '../../components/GoBack'
import { ServerMessage } from '../../utils/serverMessages'

const Player = props => {
  const isMounted = useRef(true)
  const router = useRouter()
  const { id } = router.query
    const { setPageTitle, openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading,
    setPageTitle: state.setPageTitle
  }))
  const { name, surname, resetItem, getItem } = usePlayerStore(state => ({
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
          console.log('')
          console.log('')
          console.log('error => ', error)
          console.log('')
          console.log('')
          openSnackbar({
            variant: 'error',
            message: ServerMessage[error] || ServerMessage.generic
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
    setPageTitle(`${surname} ${name}`)
  }, [name, surname])

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