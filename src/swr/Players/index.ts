import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/config'
import { useEffect, useCallback, useState } from 'react'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, stateSelector, SwrKey } from '@_swr/helpers'
import swrPlayersFetchers from './fetchers'
import { Pagination } from 'src/SDK/types'
import { CreatePlayerInput, FiltersPlayer, UpdatePlayerInput } from '@_SDK_Player/inputs'
import { ServerMessage } from '@_utils/serverMessages'
import { User } from '@_SDK_User/types'
import { Player } from '@_SDK_Player/types'

interface PlayersMoreOptions extends MoreOptions {
	filters?: FiltersPlayer
	pagination: Pagination
}

export const useSWRPlayers = <T extends PlayersMoreOptions>(options?: T) => {
	const { filters = {}, pagination = { skip: 0 }, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const filtersKey = JSON.stringify(filters)
	const paginationKey = JSON.stringify(pagination)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, isValidating } = useSWR([SwrKey.PLAYERS, filtersKey, paginationKey], swrPlayersFetchers.listFetcher, {
		revalidateOnMount: hasToken,
		shouldRetryOnError: false,
		revalidateOnFocus: false,
		...(restOfOpts || {})
	})

	useEffect(() => {
		setIsLoading(isValidating)
	}, [isValidating])

	const triggerThis = useCallback(
		(shouldRevalidate: boolean = true) => {
			return trigger([SwrKey.PLAYERS, filtersKey, paginationKey], shouldRevalidate)
		},
		[trigger, filtersKey, paginationKey]
	)

	// SHORTCUT LIST
	const deletePlayer = useCallback(
		async (_id: string, isMe?: boolean) => {
			try {
				await apiInstance.player.delete(_id)
				if (isMe)
					mutateCache(
						SwrKey.ME,
						produce((draft: User) => {
							draft.player = null
						})
					)
				cache.delete([SwrKey.PLAYER, _id])
				await triggerThis()
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
			}
		},
		[openSnackbar, triggerThis]
	)

	return {
		list: (get(data, 'result', []) || []) as Player[],
		totalCount: get(data, 'totalCount', 0),
		trigger: triggerThis,
		deletePlayer,
		isValidating
	}
}

export const useSWRPlayer = <T extends MoreOptions>(_id: string | null | undefined, options?: T) => {
	const { fromCache = true, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const initialData = fromCache ? cache.get([SwrKey.PLAYER, _id]) : undefined
	const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, mutate, isValidating } = useSWR([SwrKey.PLAYER, _id], swrPlayersFetchers.itemFetcher, {
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
			return trigger([SwrKey.PLAYER, _id], shouldRevalidate)
		},
		[trigger]
	)

	const mutateThis = useCallback(
		(data: DirectMutationImmer<Player>, shouldRevalidate: boolean = false) => {
			return mutate(produce(data), shouldRevalidate)
		},
		[mutate]
	)

	const createPlayer = useCallback(
		async (body: CreatePlayerInput) => {
			try {
				const _id = await apiInstance.player.create(body)
				mutateThis((draft: Player) => {
					draft._id = _id
					if (![null, undefined].includes(body.state)) draft.state = body.state
					draft.positions = body.positions
					draft.score = body.score
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

	const updatePlayer = useCallback(
		async (body: UpdatePlayerInput, isMe?: boolean) => {
			try {
				await apiInstance.player.update(body)
				mutateThis((draft: Player) => {
					if (![null, undefined].includes(body.positions)) draft.positions = body.positions
					if (![null, undefined].includes(body.state)) draft.state = body.state
					if (![null, undefined].includes(body.score)) draft.score = body.score
				})
				if (isMe)
					mutateCache(
						SwrKey.ME,
						produce((draft: User) => {
							if (![null, undefined].includes(body.positions)) draft.player.positions = body.positions
							if (![null, undefined].includes(body.state)) draft.player.state = body.state
							if (![null, undefined].includes(body.score)) draft.player.score = body.score
						})
					)
			} catch (error) {
				openSnackbar({
					variant: 'error',
					message: get(ServerMessage, error, ServerMessage.generic)
				})
			}
		},
		[openSnackbar, mutateThis]
	)

	const deletePlayer = useCallback(
		async (_id: string, isMe?: boolean) => {
			try {
				await apiInstance.player.delete(_id)
				if (isMe)
					mutateCache(
						SwrKey.ME,
						produce((draft: User) => {
							draft.player = null
						})
					)
				cache.delete([SwrKey.PLAYER, _id])
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
		item: (data as Player) || ({} as Player),
		mutate: mutateThis,
		trigger: triggerThis,
		createPlayer,
		updatePlayer,
		deletePlayer
	}
}
