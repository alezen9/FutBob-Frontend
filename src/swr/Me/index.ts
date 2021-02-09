import useSWR, { cache, trigger } from 'swr'
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
	const { fromCache = true, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const initialData = fromCache ? cache.get(SwrKey.ME) : undefined
	const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, mutate, isValidating } = useSWR(SwrKey.ME, swrMeFetchers.me, {
		initialData,
		revalidateOnMount,
		shouldRetryOnError: false,
		revalidateOnFocus: false,
		...(restOfOpts || {})
	})

	useEffect(() => {
		if (get(data, '_id', null) && !revalidateOnMount) setRevalidateOnMount(hasToken)
	}, [get(data, '_id', null), revalidateOnMount, hasToken])

	useEffect(() => {
		setIsLoading(isValidating)
	}, [isValidating])

	const triggerThis = useCallback(
		(shouldRevalidate: boolean = true) => {
			return trigger(SwrKey.ME, shouldRevalidate)
		},
		[trigger]
	)

	const mutateThis = useCallback(
		(data: DirectMutationImmer<User>, shouldRevalidate: boolean = false): Promise<User> => {
			return mutate(produce(data), shouldRevalidate)
		},
		[mutate]
	)

	const updateMyPassword = useCallback(
		async (body: ChangePasswordInput) => {
			try {
				await apiInstance.user.changeMyPassword(body)
            openSnackbar({
					variant: 'success',
					message: 'Password updated successfully'
				})
            return true
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
            return false
			}
		},
		[openSnackbar]
	)

	const updateMyRegistry = useCallback(
		async (body: UpdateRegistryInput) => {
			try {
				await apiInstance.user.update(body)
            mutateThis((draft: User) => {
					draft.registry = {
                  ...draft.registry,
                  ...body
               }
				})
            openSnackbar({
					variant: 'success',
					message: 'Registry updated successfully'
				})
            return true
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
            return false
			}
		},
		[openSnackbar]
	)

	const createMyPlayer = useCallback(
		async (body: CreatePlayerInput) => {
			try {
				const _id = await apiInstance.player.create(body)
				mutateThis((draft: User) => {
               // @ts-ignore
               draft.player = {
                  _id,
                  state: body.state,
                  positions: body.positions,
                  score: body.score
               }
				})
            openSnackbar({
					variant: 'success',
					message: 'Player creatd successfully'
				})
            return true
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
            return false
			}
		},
		[openSnackbar, mutateThis]
	)

	const updateMyPlayer = useCallback(
		async (body: UpdatePlayerInput) => {
			try {
				await apiInstance.player.update(body)
				mutateThis((draft: User) => {
					if (![null, undefined].includes(body.positions)) draft.player.positions = body.positions
					if (![null, undefined].includes(body.state)) draft.player.state = body.state
					if (![null, undefined].includes(body.score)) draft.player.score = body.score
				})
            openSnackbar({
					variant: 'success',
					message: 'Player updated successfully'
				})
            return true
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
            return false
			}
		},
		[openSnackbar, mutateThis]
	)

	const deleteMyPlayer = useCallback(
		async (_id: string) => {
			try {
				await apiInstance.player.delete(_id)
				mutateThis((draft: User) => {
					draft.player = null
				})
            openSnackbar({
					variant: 'success',
					message: 'Player deleted successfully'
				})
            return true
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
            return false
			}
		},
		[openSnackbar]
	)

	return {
		item: (data || {}) as User,
		trigger: triggerThis,
		updateMyPassword,
		updateMyRegistry,
		createMyPlayer,
		updateMyPlayer,
		deleteMyPlayer
	}
}
