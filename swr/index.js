import useSWR, { trigger } from 'swr'
import swrKeys from './keys'
import swrFetchers from './fetchers'
import produce from 'immer'
import { useConfigStore } from '../src/zustand/configStore'
import { useEffect, useCallback } from 'react'

export const useSWRUser = options => {
  const { data, mutate } = useSWR(
    swrKeys.USER,
    swrFetchers.profileFetcher,
    {
      initialData: {},
      revalidateOnFocus: false,
      revalidateOnMount: true,
      ...options || {}
    }
  )

  const triggerThis = useCallback(
    () => {
      trigger(swrKeys.USER)
    }, [trigger])

  return {
    item: data || {},
    mutate: produce(mutate),
    trigger: triggerThis
  }
}

export const useSWRPlayers = options => {
  const { setIsLoading } = useConfigStore()
  const { data, isValidating, mutate } = useSWR(
    swrKeys.PLAYERS,
    swrFetchers.playersFetcher,
    {
      initialData: {},
      revalidateOnFocus: false,
      revalidateOnMount: true,
      ...options || {}
    }
  )

  useEffect(() => {
    setIsLoading(isValidating)
  }, [setIsLoading, isValidating])

  const triggerThis = useCallback(
    () => {
      trigger(swrKeys.PLAYERS)
    }, [trigger])

  return {
    list: data || [],
    mutate: produce(mutate),
    trigger: triggerThis
  }
}

export const useSWRPlayer = (_id, options) => {
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
    () => {
      trigger(swrKeys.PLAYER)
    }, [trigger])

  return {
    item: data || {},
    mutate: produce(mutate),
    trigger: triggerThis
  }
}
