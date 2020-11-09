import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { filter, get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, mutateDraft, stateSelector, SwrKey } from '@_swr/helpers'
import swrFieldsFetchers from './fetchers'
import { Field } from '@_entities/Fields'
import { FieldFilters, UpdateFieldInput } from 'src/SDK/types/Fields'

interface FieldsMoreOptions extends MoreOptions {
   filters?: FieldFilters
}

export const useSWRFields = <T extends FieldsMoreOptions>(options?: T) => {
  const { filters = {}, ...restOfOpts } = options || {}
  const hasToken = apiInstance.hasToken()
  const filtersKey = JSON.stringify(filters)
  const { setIsLoading } = useConfigStore(stateSelector)
  const { data, mutate, isValidating } = useSWR(
    [SwrKey.FIELDS, filtersKey],
    swrFieldsFetchers.fieldsFetcher,
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
      return trigger([SwrKey.FIELDS, filtersKey], shouldRevalidate)
    }, [trigger])

  const deleteField = useCallback(
    async (_id: string): Promise<boolean> => {
      try {
      const deleted = await apiInstance.field_deleteField({ _id })
      if (!deleted) throw new Error()
      cache.delete([SwrKey.FIELD, _id])
      triggerThis()
        return true
      } catch (error) {
        return false
      }
    }, [triggerThis])

  return {
    list: get(data, 'result', []) as Field[] || [] as Field[],
    totalCount: get(data, 'totalCount', 0),
    trigger: triggerThis,
    deleteField,
    isValidating
  }
}

export const useSWRField = <T extends MoreOptions>(_id: string|null|undefined, options?: T) => {
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.hasToken()
  const { setIsLoading } = useConfigStore(stateSelector)
  const initialData = fromCache
    ? cache.get([SwrKey.PLAYER, _id])
    : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)
  const { data, mutate, isValidating } = useSWR(
    [SwrKey.FIELD, _id],
    swrFieldsFetchers.fieldFetcher,
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
      return trigger([SwrKey.FIELD, _id], shouldRevalidate)
    }, [trigger])

  const mutateThis = useCallback(
    (data: Partial<Field>|DirectMutationImmer<Field>, shouldRevalidate: boolean = false) => {
      if(typeof data === 'function') return mutate(produce(data), shouldRevalidate)
      else return mutate(produce(mutateDraft(data)), shouldRevalidate)
    }, [mutate])


  const createEditField = useCallback(
    async (field: Omit<Field, '_id'> & Partial<Pick<Field, '_id'>>): Promise<string|boolean> => {
      try {
         let fieldId = field._id
         if(!field._id){
            fieldId = await apiInstance.field_createField(field)
            if(!fieldId) throw new Error()
         } else {
            const done = await apiInstance.field_updateField(field as UpdateFieldInput)
            mutateCache([SwrKey.FIELD, fieldId], field, false)
         }
         return field._id
            ? true
            : fieldId
      } catch(error){
         return false
      }
  }, [mutateThis])

  const deleteField = useCallback(
    async (): Promise<boolean> => {
      try {
      const deleted = await apiInstance.field_deleteField({ _id: get(data, '_id', null) })
      if (!deleted) throw new Error()
      cache.delete([SwrKey.PLAYER, _id])
      const { _id: userConnectedId } = cache.get(SwrKey.USER)
      if(userConnectedId === get(data, 'user._id', null)){
        mutateCache(SwrKey.USER, produce(draft => {
          draft.futsalPlayer = null
        }), false)
      }
        return true
      } catch (error) {
        return false
      }
    }, [mutateThis, get(data, '_id', null), get(data, 'user._id', null)])

  return {
    item: data as Field || {} as Field,
    mutate: mutateThis,
    trigger: triggerThis,
    createEditField,
    deleteField
  }
}