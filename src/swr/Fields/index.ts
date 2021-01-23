import useSWR, { cache, trigger } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { filter, get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, stateSelector, SwrKey } from '@_swr/helpers'
import swrFieldsFetchers from './fetchers'
import { CreateFieldInput, FiltersField, UpdateFieldInput } from '@_SDK_Field/inputs'
import { Pagination } from 'src/SDK/types'
import { ServerMessage } from '@_utils/serverMessages'
import { Field } from '@_SDK_Field/types'

interface FieldsMoreOptions extends MoreOptions {
	filters?: FiltersField
	pagination: Pagination
}

export const useSWRFields = <T extends FieldsMoreOptions>(options?: T) => {
	const { filters = {}, pagination = { skip: 0 }, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const filtersKey = JSON.stringify(filters)
	const paginationKey = JSON.stringify(pagination)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, isValidating } = useSWR([SwrKey.FIELDS, filtersKey, paginationKey], swrFieldsFetchers.listFetcher, {
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
			return trigger([SwrKey.FIELDS, filtersKey, paginationKey], shouldRevalidate)
		},
		[trigger, filtersKey, paginationKey]
	)

	// SHORTCUT LIST
	const deleteField = useCallback(
		async (_id: string) => {
			try {
				await apiInstance.field.delete(_id)
				cache.delete([SwrKey.FIELD, _id])
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
		list: (get(data, 'result', []) || []) as Field[],
		totalCount: get(data, 'totalCount', 0),
		trigger: triggerThis,
		deleteField,
		isValidating
	}
}

export const useSWRField = <T extends MoreOptions>(_id: string | null | undefined, options?: T) => {
	const { fromCache = true, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const initialData = fromCache ? cache.get([SwrKey.FIELD, _id]) : undefined
	const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, mutate, isValidating } = useSWR([SwrKey.FIELD, _id], swrFieldsFetchers.itemFetcher, {
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
			return trigger([SwrKey.FIELD, _id], shouldRevalidate)
		},
		[trigger]
	)

	const mutateThis = useCallback(
		(data: DirectMutationImmer<Field>, shouldRevalidate: boolean = false) => {
			return mutate(produce(data), shouldRevalidate)
		},
		[mutate]
	)

	const createField = useCallback(
		async (body: CreateFieldInput) => {
			try {
				const _id = await apiInstance.field.create(body)
				mutateThis((draft: Field) => {
					draft._id = _id
					draft.name = body.name
					draft.type = body.type
					draft.state = body.state
					draft.price = body.price
					draft.measurements = body.measurements
					draft.location = body.location
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

	const updateField = useCallback(
		async (body: UpdateFieldInput) => {
			try {
				await apiInstance.field.update(body)
				mutateThis((draft: Field) => {
					if (![null, undefined].includes(body.name)) draft.name = body.name
					if (![null, undefined].includes(body.type)) draft.type = body.type
					if (![null, undefined].includes(body.state)) draft.state = body.state
					if (![null, undefined].includes(body.price)) draft.price = body.price
					if (![null, undefined].includes(body.measurements)) draft.measurements = body.measurements
					if (![null, undefined].includes(body.type)) draft.location = body.location
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

	const deleteField = useCallback(
		async (_id: string) => {
			try {
				await apiInstance.field.delete(_id)
				cache.delete([SwrKey.FIELD, _id])
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
		item: (data || {}) as Field,
		mutate: mutateThis,
		trigger: triggerThis,
		createField,
		updateField,
		deleteField
	}
}
