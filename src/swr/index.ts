import useSWR, { trigger } from 'swr'
import swrKeys from './keys'
import swrFetchers from './fetchers'
import produce from 'immer'
import { useConfigStore } from '../zustand/configStore'
import { useEffect, useCallback } from 'react'
import { Player } from '../Entities/Player'
import { User } from '../Entities/User'
import { apiInstance } from '../SDK'

export const useSWRUser = (options?: any) => {
  const hasToken = apiInstance.hasToken()
  const { data, mutate } = useSWR(
    swrKeys.USER,
    swrFetchers.profileFetcher,
    {
      initialData: {},
      revalidateOnFocus: false,
      revalidateOnMount: hasToken,
      ...options || {}
    }
  )

  const triggerThis = useCallback(
    async () => {
      trigger(swrKeys.USER)
    }, [trigger])

  return {
    item: data || {} as User,
    mutate: produce(mutate),
    trigger: triggerThis
  }
}

export const useSWRPlayers = (options?: any) => {
  const hasToken = apiInstance.hasToken()
  const { setIsLoading } = useConfigStore()
  const { data, isValidating, mutate } = useSWR(
    swrKeys.PLAYERS,
    swrFetchers.playersFetcher,
    {
      initialData: [],
      revalidateOnFocus: false,
      revalidateOnMount: hasToken,
      ...options || {}
    }
  )

  useEffect(() => {
    setIsLoading(isValidating)
  }, [setIsLoading, isValidating])

  const triggerThis = useCallback(
    async () => {
      trigger(swrKeys.PLAYERS)
    }, [trigger])

  return {
    list: data || [] as Player[],
    mutate: produce(mutate),
    trigger: triggerThis
  }
}

export const useSWRPlayer = (_id: string | null, options?: any) => {
  const { data, mutate } = useSWR(
    [swrKeys.PLAYER, _id],
    swrFetchers.playerFetcher,
    {
      initialData: {},
      revalidateOnFocus: false,
      revalidateOnMount: false,
      ...options || {}
    }
  )

  const triggerThis = useCallback(
    async () => {
      trigger(swrKeys.PLAYER)
    }, [trigger])

  return {
    item: data || {} as Player,
    mutate: produce(mutate),
    trigger: triggerThis
  }
}
