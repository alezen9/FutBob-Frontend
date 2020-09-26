import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import SwrKey from './keys'
import swrFetchers from './fetchers'
import produce, { Draft } from 'immer'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { EditablePlayer, Player } from '@_entities/Player'
import { EditableUser, User } from '@_entities/User'
import { apiInstance } from '../SDK'
import { ConfigStore } from '@_zustand/helpers'
import { ServerMessage } from '@_utils/serverMessages'
import { findIndex, get, isEmpty, isEqual, isObject } from 'lodash'

const stateSelector = (state: ConfigStore) => ({
  setIsLoading: state.setIsLoading
})

const iterateAndAssign = (data, draft, prefix?: string) => {
  for(const [key, val] of Object.entries(data)){
    if(isObject(val)) iterateAndAssign(val, draft, key)
    else draft[`${prefix ? `${prefix}.` : ''}${key}`] = val
  }
}

const mutateDraft = data => draft => {
  iterateAndAssign(data, draft)
}

export type DirectMutationImmer<T> = ((draft: Draft<T>) => void)|((currentState: Readonly<T>, draft: Draft<T>) => void)

interface MoreOptions {
  fromCache?: boolean
  initialData?: any
  revalidateOnFocus?: boolean
  revalidateOnMount?: boolean
  shouldRetryOnError?: boolean
}

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
    swrFetchers.profileFetcher,
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

export const useSWRPlayers = <T extends MoreOptions>(options?: T) => {
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.hasToken()
  const { setIsLoading } = useConfigStore(stateSelector)
  const initialData = fromCache
    ? cache.get(SwrKey.PLAYERS)
    : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)
  const { data, mutate, isValidating } = useSWR(
    SwrKey.PLAYERS,
    swrFetchers.playersFetcher,
    {
      initialData,
      revalidateOnMount,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      ...restOfOpts || {}
    }
  )

  useEffect(() => {
    if(data && !revalidateOnMount) setRevalidateOnMount(hasToken)
  }, [(data || []).length, revalidateOnMount, hasToken])

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating])

  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true) => {
      return trigger(SwrKey.PLAYERS, shouldRevalidate)
    }, [trigger])

  const mutateThis = useCallback(
    (data: Player[]|DirectMutationImmer<Player[]>, shouldRevalidate: boolean = false) => {
      if(typeof data === 'function') return mutate(produce(data), shouldRevalidate)
      else return mutate(produce(mutateDraft(data)), shouldRevalidate)
    }, [mutate])

  const deletePlayer = useCallback(
    async (playerId: string, userId: string): Promise<boolean> => {
      try {
      const deleted = await apiInstance.player_deletePlayer({
        _id: playerId,
        idUser: userId,
        type: 1
      })
      if (!deleted) throw new Error()
      cache.delete([SwrKey.PLAYER, playerId])
      const { _id: userConnectedId } = cache.get(SwrKey.USER)
      if(userConnectedId === userId){
        mutateCache(SwrKey.USER, produce(draft => {
          draft.futsalPlayer = null
        }), false)
      }
      mutateCache(SwrKey.PLAYERS, (current: Player[]|undefined) => {
        if(current) current.splice(current.findIndex(player => player._id === playerId), 1)
        return current
      }, false)
        return true
      } catch (error) {
        return false
      }
    }, [mutateThis])

  return {
    list: data as Player[] || [] as Player[],
    mutate: mutateThis,
    trigger: triggerThis,
    deletePlayer
  }
}

export const useSWRPlayer = <T extends MoreOptions>(_id: string|null|undefined, options?: T) => {
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.hasToken()
  const { setIsLoading } = useConfigStore(stateSelector)
  const initialData = fromCache
    ? cache.get([SwrKey.PLAYER, _id])
    : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)
  const { data, mutate, isValidating } = useSWR(
    [SwrKey.PLAYER, _id],
    swrFetchers.playerFetcher,
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
      return trigger([SwrKey.PLAYER, _id], shouldRevalidate)
    }, [trigger])

  const mutateThis = useCallback(
    (data: EditablePlayer|DirectMutationImmer<Player>, shouldRevalidate: boolean = false) => {
      if(typeof data === 'function') return mutate(produce(data), shouldRevalidate)
      else return mutate(produce(mutateDraft(data)), shouldRevalidate)
    }, [mutate])


  const createEditPlayer = useCallback(
    async (player: Omit<Player, '_id'> & Partial<Pick<Player, '_id'>>): Promise<string|boolean> => {
      try {
      const _player = { ...player }
      const { user, ...futsalPlayer } = _player
      if(!_player._id){
        const { _id, matches, ...playerData } = futsalPlayer
        const bodyCreate = {
            userData: user,
            playerData
          }
        const playerId = await apiInstance.player_createPlayer(bodyCreate)
        if(!playerId) throw new Error()
        _player._id = playerId
      } else {
        const { type, matches, ...bodyUpdate } = futsalPlayer
        const { user: thisUser, ...thisFutsalPlayer } = cache.get([SwrKey.PLAYER, _player._id]) || {}
        let playerUpdated = true
        let userUpdated = true
        if(!isEqual(thisFutsalPlayer, futsalPlayer)){
          playerUpdated = await apiInstance.player_updatePlayer(bodyUpdate)
        }
        if(!isEqual(thisUser, user)){
          userUpdated = await apiInstance.user_updateUser(user)
        }
        if(!(playerUpdated && userUpdated)) throw new Error()
      }
      mutateCache([SwrKey.PLAYER, _player._id], _player, false)
      const { _id: userConnectedId } = cache.get(SwrKey.USER)
      if(userConnectedId === user._id){
        mutateCache(SwrKey.USER, produce(draft => {
          draft.futsalPlayer = futsalPlayer
        }), false)
      }
      mutateCache(SwrKey.PLAYERS, (current: Player[]|undefined) => {
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
      }, false)
      return _player._id
    } catch(error){
      return false
    }
  }, [mutateThis])

  const deletePlayer = useCallback(
    async (): Promise<boolean> => {
      try {
      const deleted = await apiInstance.player_deletePlayer({
        _id: get(data, '_id', null),
        idUser: get(data, 'user._id', null),
        type: 1
      })
      if (!deleted) throw new Error()
      cache.delete([SwrKey.PLAYER, _id])
      const { _id: userConnectedId } = cache.get(SwrKey.USER)
      if(userConnectedId === get(data, 'user._id', null)){
        mutateCache(SwrKey.USER, produce(draft => {
          draft.futsalPlayer = null
        }), false)
      }
      mutateCache(SwrKey.PLAYERS, (current: Player[]|undefined) => {
        if(current) current.splice(current.findIndex(player => player._id === get(data, '_id', null)), 1)
        return current
      }, false)
        return true
      } catch (error) {
        return false
      }
    }, [mutateThis, get(data, '_id', null), get(data, 'user._id', null)])

  return {
    item: data as Player || {} as Player,
    mutate: mutateThis,
    trigger: triggerThis,
    createEditPlayer,
    deletePlayer
  }
}