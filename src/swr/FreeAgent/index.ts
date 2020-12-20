import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, mutateDraft, stateSelector, SwrKey } from '@_swr/helpers'
import { FreeAgentFilters, UpdateFreeAgentInput } from 'src/SDK/Modules/FreeAgent/types'
import swrFreeAgentFetchers from './fetchers'
import { FreeAgent } from 'src/SDK/Modules/FreeAgent/entities'

interface FreeAgentMoreOptions extends MoreOptions {
   filters?: FreeAgentFilters
}

export const useSWRFreeAgents = <T extends FreeAgentMoreOptions>(options?: T) => {
  const { filters = {}, ...restOfOpts } = options || {}
  const hasToken = apiInstance.auth.hasToken()
  const filtersKey = JSON.stringify(filters)
  const { setIsLoading } = useConfigStore(stateSelector)
  const { data, mutate, isValidating } = useSWR(
    [SwrKey.FREE_AGENTS, filtersKey],
    swrFreeAgentFetchers.freeAgentsFetcher,
    {
      revalidateOnMount: hasToken,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      ...restOfOpts || {}
    }
  )

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating])

  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true) => {
      return trigger([SwrKey.FREE_AGENTS, filtersKey], shouldRevalidate)
    }, [trigger])

  const deleteFreeAgent = useCallback(
    async (_id: string): Promise<boolean> => {
      try {
      const deleted = await apiInstance.freeAgent.delete(_id)
      if (!deleted) throw new Error()
      cache.delete([SwrKey.FREE_AGENT, _id])
      triggerThis()
        return true
      } catch (error) {
        return false
      }
    }, [triggerThis])

  return {
    list: get(data, 'result', []) as FreeAgent[] || [] as FreeAgent[],
    totalCount: get(data, 'totalCount', 0),
    trigger: triggerThis,
    deleteFreeAgent,
    isValidating
  }
}

export const useSWRFreeAgent = <T extends MoreOptions>(_id: string|null|undefined, options?: T) => {
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.auth.hasToken()
  const { setIsLoading } = useConfigStore(stateSelector)
  const initialData = fromCache
    ? cache.get([SwrKey.FREE_AGENT, _id])
    : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)
  const { data, mutate, isValidating } = useSWR(
    [SwrKey.FREE_AGENT, _id],
    swrFreeAgentFetchers.freeAgentFetcher,
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
      return trigger([SwrKey.FREE_AGENT, _id], shouldRevalidate)
    }, [trigger])

  const mutateThis = useCallback(
    (data: Partial<FreeAgent>|DirectMutationImmer<FreeAgent>, shouldRevalidate: boolean = false) => {
      if(typeof data === 'function') return mutate(produce(data), shouldRevalidate)
      else return mutate(produce(mutateDraft(data)), shouldRevalidate)
    }, [mutate])


  const createEditFreeAgent = useCallback(
    async (freeAgent: Omit<FreeAgent, '_id'> & Partial<Pick<FreeAgent, '_id'>>): Promise<string|boolean> => {
      try {
         let freeAgentId = freeAgent._id
         if(!freeAgent._id){
            freeAgentId = await apiInstance.freeAgent.create(freeAgent)
            if(!freeAgentId) throw new Error()
         } else {
            const done = await apiInstance.freeAgent.update(freeAgent as UpdateFreeAgentInput)
            mutateCache([SwrKey.FREE_AGENT, freeAgentId], freeAgent, false)
         }
         return freeAgent._id
            ? true
            : freeAgentId
      } catch(error){
         return false
      }
  }, [mutateThis])

  const deleteFreeAgent = useCallback(
    async (): Promise<boolean> => {
      try {
      const deleted = await apiInstance.freeAgent.delete(get(data, '_id', null))
      if (!deleted) throw new Error()
      cache.delete([SwrKey.FREE_AGENT, _id])
        return true
      } catch (error) {
        return false
      }
    }, [mutateThis, get(data, '_id', null), get(data, 'user._id', null)])

  return {
    item: data as FreeAgent || {} as FreeAgent,
    mutate: mutateThis,
    trigger: triggerThis,
    createEditFreeAgent,
    deleteFreeAgent
  }
}