import useSWR, { cache, trigger } from 'swr'
import SwrKey from './keys'
import swrFetchers from './fetchers'
import produce, { Draft } from 'immer'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { EditablePlayer, Player } from '@_myentities/Player'
import { EditableUser, User } from '@_entities/User'
import { apiInstance } from '../SDK'
import { ConfigStore } from '@_zustand/helpers'
import { ServerMessage } from '@_utils/serverMessages'
import { get, isEmpty, isObject } from 'lodash'

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
    (data: EditableUser|DirectMutationImmer<User>, shouldRevalidate: boolean = false) => {
      if(typeof data === 'function') return mutate(produce(data), shouldRevalidate)
      return mutate(produce(mutateDraft(data)), shouldRevalidate)
    }, [mutate])

  return {
    item: data as User || {} as User,
    mutate: mutateThis,
    trigger: triggerThis,
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

  return {
    list: data as Player[] || [] as Player[],
    mutate: mutateThis,
    trigger: triggerThis
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

  return {
    item: data as Player || {} as Player,
    mutate: mutateThis,
    trigger: triggerThis
  }
}