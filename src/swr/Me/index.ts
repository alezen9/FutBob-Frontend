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
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
			}
		},
		[openSnackbar]
	)

	const updateMyRegistry = useCallback(
		async (body: UpdateRegistryInput) => {
			try {
				await apiInstance.user.update(body)
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
			}
		},
		[openSnackbar]
	)

	const createMyPlayer = useCallback(
		async (body: CreatePlayerInput) => {
			try {
				const _id = await apiInstance.player.create(body)
				mutateThis((draft: User) => {
					draft.player._id = _id
					if (![null, undefined].includes(body.state)) draft.player.state = body.state
					draft.player.positions = body.positions
					draft.player.score = body.score
				})
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
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
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
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
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
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
