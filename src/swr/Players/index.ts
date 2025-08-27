import useSWR, { useSWRConfig } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/config'
import { useEffect, useCallback, useState } from 'react'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, stateSelector, SwrKey } from '@_swr/helpers'
import swrPlayersFetchers from './fetchers'
import { Pagination } from 'src/SDK/types'
import { CreatePlayerInput, FiltersPlayer, SortPlayer, UpdatePlayerInput } from '@_SDK_Player/inputs'
import { ServerMessage } from '@_utils/serverMessages'
import { User } from '@_SDK_User/types'
import { Player } from '@_SDK_Player/types'
import { UpdateRegistryInput } from '@_SDK_User/inputs'

interface PlayersMoreOptions extends MoreOptions {
  filters?: FiltersPlayer
  pagination: Pagination
  sort?: SortPlayer
}

/* =========================== LIST HOOK =========================== */

export const useSWRPlayers = <T extends PlayersMoreOptions>(options?: T) => {
  const { mutate: globalMutate } = useSWRConfig()
  const { filters = {}, pagination = { skip: 0 }, sort = {}, ...restOfOpts } = options || {}
  const hasToken = apiInstance.auth.hasToken()
  const filtersKey = JSON.stringify(filters)
  const paginationKey = JSON.stringify(pagination)
  const sortKey = JSON.stringify(sort)

  const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

  const key = [SwrKey.PLAYERS, filtersKey, paginationKey, sortKey] as const

  const { data, isValidating } = useSWR(key, swrPlayersFetchers.listFetcher, {
    revalidateOnMount: hasToken,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating, setIsLoading])

  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true) =>
      globalMutate(key, undefined, { revalidate: shouldRevalidate }),
    [globalMutate, filtersKey, paginationKey, sortKey]
  )

  // prefer mutate with populateCache to set detail cache
  const setDetailCache = useCallback(
    (item: Player) =>
      globalMutate([SwrKey.PLAYER, item._id], item, {
        revalidate: false,
        populateCache: true,
      }),
    [globalMutate]
  )

  const deletePlayer = useCallback(
    async (_id: string, isMe?: boolean) => {
      try {
        await apiInstance.player.delete(_id)

        if (isMe) {
          await globalMutate(
            SwrKey.ME,
            produce((draft: User) => {
              // @ts-ignore
              draft.player = null
            }),
            { revalidate: false }
          )
        }

        // clear the single-player cache entry
        await globalMutate([SwrKey.PLAYER, _id], undefined, { revalidate: false })

        // refresh list
        await triggerThis()
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: get(ServerMessage, error, ServerMessage.generic),
        })
      }
    },
    [openSnackbar, triggerThis, globalMutate]
  )

  return {
    list: (get(data, 'result', []) || []) as Player[],
    totalCount: get(data, 'totalCount', 0),
    trigger: triggerThis,
    deletePlayer,
    setDetailCache,
    isValidating,
  }
}

/* =========================== DETAIL HOOK =========================== */

export const useSWRPlayer = <T extends MoreOptions>(_id: string | null | undefined, options?: T) => {
  const { mutate: globalMutate, cache } = useSWRConfig()
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.auth.hasToken()

  const key = [SwrKey.PLAYER, _id] as const
  const initial = fromCache ? (cache.get(key as any) as Player | undefined) : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(
    fromCache && initial ? false : hasToken
  )

  const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

  const { data, mutate, isValidating } = useSWR<Player>(key, swrPlayersFetchers.itemFetcher, {
    fallbackData: initial,
    revalidateOnMount,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    ...restOfOpts,
  })

  const playerId = (data as any)?._id
  useEffect(() => {
    if (playerId && !revalidateOnMount) setRevalidateOnMount(hasToken)
  }, [playerId, revalidateOnMount, hasToken])

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating, setIsLoading])

  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true) =>
      globalMutate(key, undefined, { revalidate: shouldRevalidate }),
    [globalMutate, _id]
  )

  const mutateThis = useCallback(
    (updater: DirectMutationImmer<Player>, shouldRevalidate: boolean = false) =>
      mutate(produce(updater), { revalidate: shouldRevalidate }),
    [mutate]
  )

  const updatePlayerRegistry = useCallback(
    async (body: UpdateRegistryInput, isMe?: boolean) => {
      try {
        await apiInstance.user.update(body)

        await mutateThis((draft: Player) => {
          if (body.name != null) draft.user.registry.name = body.name
          if (body.surname != null) draft.user.registry.surname = body.surname
          if (body.country != null) draft.user.registry.country = body.country
          if (body.dateOfBirth != null) draft.user.registry.dateOfBirth = body.dateOfBirth
          if (body.phone != null) draft.user.registry.phone = body.phone
          if (body.sex != null) draft.user.registry.sex = body.sex
          draft.user.registry.additionalInfo = {
            ...(draft.user.registry.additionalInfo || {}),
            ...(body.additionalInfo || {}),
          }
        })

        if (isMe) {
          await globalMutate(
            SwrKey.ME,
            produce((draft: User) => {
              if (body.name != null) draft.registry.name = body.name
              if (body.surname != null) draft.registry.surname = body.surname
              if (body.country != null) draft.registry.country = body.country
              if (body.dateOfBirth != null) draft.registry.dateOfBirth = body.dateOfBirth
              if (body.phone != null) draft.registry.phone = body.phone
              if (body.sex != null) draft.registry.sex = body.sex
              draft.registry.additionalInfo = {
                ...(draft.registry.additionalInfo || {}),
                ...(body.additionalInfo || {}),
              }
            }),
            { revalidate: false }
          )
        }

        openSnackbar({ variant: 'success', message: 'Player registry updated successfully' })
        return true
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: get(ServerMessage, error, ServerMessage.generic),
        })
        return false
      }
    },
    [openSnackbar, mutateThis, globalMutate]
  )

  const updatePlayerSkills = useCallback(
    async (body: UpdatePlayerInput, isMe?: boolean) => {
      try {
        await apiInstance.player.update(body)

        await mutateThis((draft: Player) => {
          if (body.positions != null) draft.positions = body.positions
          if (body.state != null) draft.state = body.state
          if (body.score != null) draft.score = body.score
        })

        if (isMe) {
          await globalMutate(
            SwrKey.ME,
            produce((draft: User) => {
              if (body.positions != null) draft.player.positions = body.positions
              if (body.state != null) draft.player.state = body.state
              if (body.score != null) draft.player.score = body.score
            }),
            { revalidate: false }
          )
        }

        openSnackbar({ variant: 'success', message: 'Player skills updated successfully' })
        return true
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: get(ServerMessage, error, ServerMessage.generic),
        })
        return false
      }
    },
    [openSnackbar, mutateThis, globalMutate]
  )

  const deletePlayer = useCallback(
    async (_id: string, isMe?: boolean) => {
      try {
        await apiInstance.player.delete(_id)

        if (isMe) {
          await globalMutate(
            SwrKey.ME,
            produce((draft: User) => {
              // @ts-ignore
              draft.player = null
            }),
            { revalidate: false }
          )
        }

        // clear the detail cache via mutate
        await globalMutate([SwrKey.PLAYER, _id], undefined, { revalidate: false })

        openSnackbar({ variant: 'success', message: 'Player deleted successfully' })
        return true
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: get(ServerMessage, error, ServerMessage.generic),
        })
        return false
      }
    },
    [openSnackbar, globalMutate]
  )

  return {
    item: (data as Player) || ({} as Player),
    mutate: mutateThis,
    trigger: triggerThis,
    updatePlayerRegistry,
    updatePlayerSkills,
    deletePlayer,
  }
}