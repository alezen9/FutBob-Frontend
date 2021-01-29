import useSWR, { cache, trigger } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/config'
import { useEffect, useCallback, useState } from 'react'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, stateSelector, SwrKey } from '@_swr/helpers'
import swrFreeAgentFetchers from './fetchers'
import { Pagination } from 'src/SDK/types'
import { ServerMessage } from '@_utils/serverMessages'
import { CreateFreeAgentInput, FiltersFreeAgent, UpdateFreeAgentInput } from '@_SDK_FreeAgent/inputs'
import { FreeAgent } from '@_SDK_FreeAgent/types'

interface FreeAgentMoreOptions extends MoreOptions {
	filters?: FiltersFreeAgent
	pagination: Pagination
}

export const useSWRFreeAgents = <T extends FreeAgentMoreOptions>(options?: T) => {
	const { filters = {}, pagination = { skip: 0 }, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const filtersKey = JSON.stringify(filters)
	const paginationKey = JSON.stringify(pagination)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, isValidating } = useSWR(
		[SwrKey.FREE_AGENTS, filtersKey, paginationKey],
		swrFreeAgentFetchers.listFetcher,
		{
			revalidateOnMount: hasToken,
			shouldRetryOnError: false,
			revalidateOnFocus: false,
			...(restOfOpts || {})
		}
	)

	useEffect(() => {
		setIsLoading(isValidating)
	}, [isValidating])

	const triggerThis = useCallback(
		(shouldRevalidate: boolean = true) => {
			return trigger([SwrKey.FREE_AGENTS, filtersKey, paginationKey], shouldRevalidate)
		},
		[trigger, filtersKey, paginationKey]
	)

	// SHORTCUT LIST
	const deleteFreeAgent = useCallback(
		async (_id: string) => {
			try {
				await apiInstance.player.delete(_id)
				cache.delete([SwrKey.FREE_AGENT, _id])
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
		list: (get(data, 'result', []) || []) as FreeAgent[],
		totalCount: get(data, 'totalCount', 0),
		trigger: triggerThis,
		deleteFreeAgent,
		isValidating
	}
}

export const useSWRFreeAgent = <T extends MoreOptions>(_id: string | null | undefined, options?: T) => {
	const { fromCache = true, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)
	const initialData = fromCache ? cache.get([SwrKey.FREE_AGENT, _id]) : undefined
	const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)
	const { data, mutate, isValidating } = useSWR([SwrKey.FREE_AGENT, _id], swrFreeAgentFetchers.itemFetcher, {
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
			return trigger([SwrKey.FREE_AGENT, _id], shouldRevalidate)
		},
		[trigger]
	)

	const mutateThis = useCallback(
		(data: DirectMutationImmer<FreeAgent>, shouldRevalidate: boolean = false) => {
			return mutate(produce(data), shouldRevalidate)
		},
		[mutate]
	)

	const createFreeAgent = useCallback(
		async (body: CreateFreeAgentInput) => {
			try {
				const _id = await apiInstance.freeAgent.create(body)
				mutateThis((draft: FreeAgent) => {
					draft._id = _id
					draft.name = body.name
					draft.surname = body.surname
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

	const updateFreeAgent = useCallback(
		async (body: UpdateFreeAgentInput) => {
			try {
				await apiInstance.freeAgent.update(body)
				mutateThis((draft: FreeAgent) => {
					if (![null, undefined].includes(body.name)) draft.name = body.name
					if (![null, undefined].includes(body.surname)) draft.surname = body.surname
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

	const deleteFreeAgent = useCallback(
		async (_id: string, isMe?: boolean) => {
			try {
				await apiInstance.player.delete(_id)
				cache.delete([SwrKey.FREE_AGENT, _id])
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
		item: data || ({} as FreeAgent),
		mutate: mutateThis,
		trigger: triggerThis,
		createFreeAgent,
		updateFreeAgent,
		deleteFreeAgent
	}
}
