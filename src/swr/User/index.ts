import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import produce, { Draft } from 'immer'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { Player } from '@_entities/Player'
import { EditableUser, User } from '@_entities/User'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, mutateDraft, stateSelector, SwrKey } from '@_swr/helpers'
import swrUserFetchers from './fetchers'

export const useSWRUser = <T extends MoreOptions>(options?: T) => {
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.hasToken()
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
    async (player: Omit<Player, '_id'> & Partial<Pick<Player, '_id'>>): Promise<boolean> => {
      try {
      const _player = { ...player }
      const { user, ...futsalPlayer } = _player
      if(!_player._id){
        const { _id, matches, ...playerData } = futsalPlayer
        const bodyCreate = {
            userId: user._id,
            playerData
          }
        const playerId = await apiInstance.player_createPlayer(bodyCreate)
        if(!playerId) throw new Error()
        _player._id = playerId
      } else {
        const { type, matches, ...bodyUpdate } = futsalPlayer
        const updated = await apiInstance.player_updatePlayer(bodyUpdate)
        if(!updated) throw new Error()
      }
      mutateThis(draft => {
        draft.futsalPlayer = futsalPlayer
      }, false)
      mutateCache([SwrKey.PLAYER, _player._id], _player, false)
      mutateCache(SwrKey.PLAYERS, ((current: Player[]|undefined) => {
        if(!current) return current
        const { edited, data } = current.reduce((acc, val) => {
          if(val._id === _player._id) {
            acc.data.push(_player as Player)
            acc.edited = true
          }
          else {
            acc.data.push(val)
          }
          return acc
        }, { edited: false, data: [] })
        if(edited) return data
        return [...data, _player as Player]
      }), false)
      return true
    } catch(error){
      return false
    }
  }, [mutateThis])

  const deletePlayer = useCallback(
    async (): Promise<boolean> => {
      try {
      const deleted = await apiInstance.player_deletePlayer({
        _id: get(data, 'futsalPlayer._id', null),
        idUser: get(data, '_id', null),
        type: 1
      })
      if (!deleted) throw new Error()
      mutateThis(draft => {
        draft.futsalPlayer = null
      }, false)
      mutateCache(SwrKey.PLAYERS, (current: Player[]|undefined) => {
        if(current) current.splice(current.findIndex(player => player._id === get(data, 'futsalPlayer._id', null)), 1)
        return current
      }, false)
        return true
      } catch (error) {
        return false
      }
    }, [mutateThis, get(data, '_id', null), get(data, 'futsalPlayer._id', null)])

  return {
    item: data as User || {} as User,
    mutate: mutateThis,
    trigger: triggerThis,
    createEditPlayer,
    deletePlayer
  }
}