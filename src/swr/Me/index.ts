import useSWR, { useSWRConfig } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/config'
import { useEffect, useCallback, useState } from 'react'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, stateSelector, SwrKey } from '@_swr/helpers'
import swrMeFetchers from './fetchers'
import { User } from '@_SDK_User/types'
import { ChangePasswordInput, UpdateRegistryInput } from '@_SDK_User/inputs'
import { ServerMessage } from '@_utils/serverMessages'
import { CreatePlayerInput, UpdatePlayerInput } from '@_SDK_Player/inputs'

export const useSWRMe = <T extends MoreOptions>(options?: T) => {
  const { cache, mutate: globalMutate } = useSWRConfig()
  const { fromCache = true, ...restOfOpts } = options || {}

  const hasToken = apiInstance.auth.hasToken()
  const initial = fromCache ? (cache.get(SwrKey.ME) as User | undefined) : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(
    fromCache && initial ? false : hasToken
  )

  const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

  const { data, mutate, error, isValidating } = useSWR<User>(SwrKey.ME, swrMeFetchers.me, {
    fallbackData: initial,          // v2
    revalidateOnMount,              // ok in v2
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    ...restOfOpts
  })

  // avoid calling get() inside deps — use the actual value
  const userId = (data as any)?._id
  useEffect(() => {
    if (userId && !revalidateOnMount) setRevalidateOnMount(hasToken)
  }, [userId, revalidateOnMount, hasToken])

  useEffect(() => {
    if (!error) setIsLoading(isValidating)
  }, [isValidating, error, setIsLoading])

  // trigger() -> globalMutate with revalidate option
  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true) =>
      globalMutate(SwrKey.ME, undefined, { revalidate: shouldRevalidate }),
    [globalMutate]
  )

  // mutate(produce(...), { revalidate })
  const mutateThis = useCallback(
    (updater: DirectMutationImmer<User>, shouldRevalidate = false): Promise<User | undefined> =>
      mutate(produce(updater), { revalidate: shouldRevalidate }),
    [mutate]
  )

  const updateMyPassword = useCallback(
    async (body: ChangePasswordInput) => {
      try {
        await apiInstance.user.changeMyPassword(body)
        openSnackbar({ variant: 'success', message: 'Password updated successfully' })
        return true
      } catch (err) {
        openSnackbar({ variant: 'error', message: get(ServerMessage, err, ServerMessage.generic) })
        return false
      }
    },
    [openSnackbar]
  )

  const updateMyEmail = useCallback(
    async (newEmail: string) => {
      try {
        await apiInstance.user.changeMyEmail(newEmail)
        openSnackbar({ variant: 'success', message: 'Email updated successfully' })
        return true
      } catch (err) {
        openSnackbar({ variant: 'error', message: get(ServerMessage, err, ServerMessage.generic) })
        return false
      }
    },
    [openSnackbar]
  )

  const updateMyRegistry = useCallback(
    async (body: UpdateRegistryInput) => {
      try {
        await apiInstance.user.update(body)
        await mutateThis((draft: User) => {
          draft.registry = { ...draft.registry, ...body }
        })
        openSnackbar({ variant: 'success', message: 'Registry updated successfully' })
        return true
      } catch (err) {
        openSnackbar({ variant: 'error', message: get(ServerMessage, err, ServerMessage.generic) })
        return false
      }
    },
    [openSnackbar, mutateThis]
  )

  const createMyPlayer = useCallback(
    async (body: CreatePlayerInput) => {
      try {
        const _id = await apiInstance.player.create(body)
        await mutateThis((draft: User) => {
          // @ts-ignore
          draft.player = { _id, state: body.state, positions: body.positions, score: body.score }
        })
        openSnackbar({ variant: 'success', message: 'Player creatd successfully' })
        return true
      } catch (err) {
        openSnackbar({ variant: 'error', message: get(ServerMessage, err, ServerMessage.generic) })
        return false
      }
    },
    [openSnackbar, mutateThis]
  )

  const updateMyPlayer = useCallback(
    async (body: UpdatePlayerInput) => {
      try {
        await apiInstance.player.update(body)
        await mutateThis((draft: User) => {
          if (body.positions != null) draft.player!.positions = body.positions
          if (body.state != null) draft.player!.state = body.state
          if (body.score != null) draft.player!.score = body.score
        })
        openSnackbar({ variant: 'success', message: 'Player updated successfully' })
        return true
      } catch (err) {
        openSnackbar({ variant: 'error', message: get(ServerMessage, err, ServerMessage.generic) })
        return false
      }
    },
    [openSnackbar, mutateThis]
  )

  const deleteMyPlayer = useCallback(
    async (_id: string) => {
      try {
        await apiInstance.player.delete(_id)
        await mutateThis((draft: User) => {
          // @ts-ignore
          draft.player = null
        })
        openSnackbar({ variant: 'success', message: 'Player deleted successfully' })
        return true
      } catch (err) {
        openSnackbar({ variant: 'error', message: get(ServerMessage, err, ServerMessage.generic) })
        return false
      }
    },
    [openSnackbar, mutateThis]
  )

  return {
    item: (data || {}) as User,
    trigger: triggerThis,
    updateMyPassword,
    updateMyRegistry,
    updateMyEmail,
    createMyPlayer,
    updateMyPlayer,
    deleteMyPlayer
  }
}