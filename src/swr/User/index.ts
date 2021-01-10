import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { Player } from '@_SDK_Player/entities'
import { User } from '@_SDK_User/entities'
import { EditableUser, UpdateUserInput } from '@_SDK_User/types'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, mutateDraft, stateSelector, SwrKey } from '@_swr/helpers'
import swrUserFetchers from './fetchers'

export const useSWRUser = <T extends MoreOptions>(options?: T) => {
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.auth.hasToken()
  const { setIsLoading } = useConfigStore(stateSelector)
  const initialData = fromCache
    ? cache.get(SwrKey.USER)
    : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)
  const { data, mutate, isValidating } = useSWR(
    SwrKey.USER,
    swrUserFetchers.profileFetcher,
    {
      initialData,
      revalidateOnMount,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      ...restOfOpts || {}
    }
  )

  useEffect(() => {
    if(get(data, '_id', null) && !revalidateOnMount) setRevalidateOnMount(hasToken)
  }, [get(data, '_id', null), revalidateOnMount, hasToken])

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating])

  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true) => {
      return trigger(SwrKey.USER, shouldRevalidate)
    }, [trigger])

  const mutateThis = useCallback(
    (data: EditableUser|DirectMutationImmer<User>, shouldRevalidate: boolean = false): Promise<User> => {
      if(typeof data === 'function') return mutate(produce(data), shouldRevalidate)
      return mutate(produce(mutateDraft(data)), shouldRevalidate)
    }, [mutate])

  const createEditPlayer = useCallback(
    async (__player: Omit<Player, '_id'> & Partial<Pick<Player, '_id'>>): Promise<boolean> => {
      try {
      const _player = { ...__player }
      const { user, ...player } = _player
      if(!_player._id){
        const { _id, ...playerData } = player
        const bodyCreate = {
            userId: user._id,
            playerData
          }
        const playerId = await apiInstance.player.create(bodyCreate)
        if(!playerId) throw new Error()
        _player._id = playerId
      } else {
        const updated = await apiInstance.player.update(player as UpdateUserInput)
        if(!updated) throw new Error()
      }
      mutateThis(draft => {
        draft.player = _player
      }, false)
      mutateCache([SwrKey.PLAYER, _player._id], _player, false)
      return true
    } catch(error){
      return false
    }
  }, [mutateThis])

  const deletePlayer = useCallback(
    async (): Promise<boolean> => {
      try {
      const deleted = await apiInstance.player.delete({
        _id: get(data, 'player._id', null),
        idUser: get(data, '_id', null)
      })
      if (!deleted) throw new Error()
      mutateThis(draft => {
        draft.player = null
      }, false)
        return true
      } catch (error) {
        return false
      }
    }, [mutateThis, get(data, '_id', null), get(data, 'player._id', null)])

  return {
    item: data as User || {} as User,
    mutate: mutateThis,
    trigger: triggerThis,
    createEditPlayer,
    deletePlayer
  }
}