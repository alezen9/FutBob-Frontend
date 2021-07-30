import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import produce from 'immer'
import { useConfigStore } from '@_zustand/config'
import { useEffect, useCallback, useState } from 'react'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { DirectMutationImmer, MoreOptions, stateSelector, SwrKey } from '@_swr/helpers'
import swrAppointmentsFetchers from './fetchers'
import { Pagination } from 'src/SDK/types'
import { ServerMessage } from '@_utils/serverMessages'
import { FiltersAppointment, SortAppointment } from 'src/SDK/Modules/Appointment/inputs'
import { Appointment } from 'src/SDK/Modules/Appointment/types'


interface AppointmentMoreOptions extends MoreOptions {
	filters?: FiltersAppointment
	pagination: Pagination
   sort?: SortAppointment
}

export const useSWRPAppointments = <T extends AppointmentMoreOptions>(options?: T) => {
	const { filters = {}, pagination = { skip: 0 }, sort = {}, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const filtersKey = JSON.stringify(filters)
	const paginationKey = JSON.stringify(pagination)
   const sortKey = JSON.stringify(sort)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, isValidating } = useSWR([SwrKey.APPOINTMENTS, filtersKey, paginationKey, sortKey], swrAppointmentsFetchers.listFetcher, {
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
			return trigger([SwrKey.APPOINTMENTS, filtersKey, paginationKey, sortKey], shouldRevalidate)
		}, [trigger, filtersKey, paginationKey, sortKey])

   const setDetailCache = useCallback((item: Appointment) => {
      cache.set([SwrKey.APPOINTMENT, item._id], item)
   }, [])

	return {
		list: (get(data, 'result', []) || []) as Appointment[],
		totalCount: get(data, 'totalCount', 0),
		trigger: triggerThis,
      setDetailCache,
		isValidating
	}
}

export const useSWRAppointment = <T extends MoreOptions>(_id: string | null | undefined, options?: T) => {
	const { fromCache = true, ...restOfOpts } = options || {}
	const hasToken = apiInstance.auth.hasToken()
	const initialData = fromCache ? cache.get([SwrKey.APPOINTMENT, _id]) : undefined
	const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)

	const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)

	const { data, mutate, isValidating } = useSWR([SwrKey.APPOINTMENT, _id], swrAppointmentsFetchers.itemFetcher, {
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
			return trigger([SwrKey.APPOINTMENT, _id], shouldRevalidate)
		}, [trigger])

	const mutateThis = useCallback(
		(data: DirectMutationImmer<Appointment>, shouldRevalidate: boolean = false) => {
			return mutate(produce(data), shouldRevalidate)
		}, [mutate])

   // const updatePlayerRegistry = useCallback(
	// 	async (body: UpdateRegistryInput, isMe?: boolean) => {
	// 		try {
	// 			await apiInstance.user.update(body)
	// 			mutateThis((draft: Player) => {
	// 				if (![null, undefined].includes(body.name)) draft.user.registry.name = body.name
	// 				if (![null, undefined].includes(body.surname)) draft.user.registry.surname  = body.surname
	// 				if (![null, undefined].includes(body.country)) draft.user.registry.country  = body.country
	// 				if (![null, undefined].includes(body.dateOfBirth)) draft.user.registry.dateOfBirth  = body.dateOfBirth
	// 				if (![null, undefined].includes(body.phone)) draft.user.registry.phone  = body.phone
   //             if (![null, undefined].includes(body.sex)) draft.user.registry.sex  = body.sex
   //             draft.user.registry.additionalInfo = {
   //                ...draft.user.registry.additionalInfo || {},
   //                ...body.additionalInfo || {}
   //             }
	// 			})
	// 			if (isMe) {
	// 				mutateCache(
	// 					SwrKey.ME,
	// 					produce((draft: User) => {
   //                   if (![null, undefined].includes(body.name)) draft.registry.name = body.name
   //                   if (![null, undefined].includes(body.surname)) draft.registry.surname  = body.surname
   //                   if (![null, undefined].includes(body.country)) draft.registry.country  = body.country
   //                   if (![null, undefined].includes(body.dateOfBirth)) draft.registry.dateOfBirth  = body.dateOfBirth
   //                   if (![null, undefined].includes(body.phone)) draft.registry.phone  = body.phone
   //                   if (![null, undefined].includes(body.sex)) draft.registry.sex  = body.sex
   //                   draft.registry.additionalInfo = {
   //                      ...draft.registry.additionalInfo || {},
   //                      ...body.additionalInfo || {}
   //                   }
   //                })
	// 				)
   //          }
   //          openSnackbar({
	// 				variant: 'success',
	// 				message: 'Player registry updated successfully'
	// 			})
   //          return true
	// 		} catch (error) {
	// 			openSnackbar({
	// 				variant: 'error',
	// 				message: get(ServerMessage, error, ServerMessage.generic)
	// 			})
   //          return false
	// 		}
	// 	}, [openSnackbar, mutateThis])

	// const updatePlayerSkills = useCallback(
	// 	async (body: UpdatePlayerInput, isMe?: boolean) => {
	// 		try {
	// 			await apiInstance.player.update(body)
	// 			mutateThis((draft: Player) => {
	// 				if (![null, undefined].includes(body.positions)) draft.positions = body.positions
	// 				if (![null, undefined].includes(body.state)) draft.state = body.state
	// 				if (![null, undefined].includes(body.score)) draft.score = body.score
	// 			})
	// 			if (isMe){
	// 				mutateCache(
	// 					SwrKey.ME,
	// 					produce((draft: User) => {
	// 						if (![null, undefined].includes(body.positions)) draft.player.positions = body.positions
	// 						if (![null, undefined].includes(body.state)) draft.player.state = body.state
	// 						if (![null, undefined].includes(body.score)) draft.player.score = body.score
	// 					})
	// 				)
   //          }
   //          openSnackbar({
	// 				variant: 'success',
	// 				message: 'Player skills updated successfully'
	// 			})
   //          return true
	// 		} catch (error) {
	// 			openSnackbar({
	// 				variant: 'error',
	// 				message: get(ServerMessage, error, ServerMessage.generic)
	// 			})
   //          return false
	// 		}
	// 	}, [openSnackbar, mutateThis])

	// const deletePlayer = useCallback(
	// 	async (_id: string, isMe?: boolean) => {
	// 		try {
	// 			await apiInstance.player.delete(_id)
	// 			if (isMe)
	// 				mutateCache(
	// 					SwrKey.ME,
	// 					produce((draft: User) => {
	// 						draft.player = null
	// 					})
	// 				)
	// 			cache.delete([SwrKey.PLAYER, _id])
   //          openSnackbar({
	// 				variant: 'success',
	// 				message: 'Player deleted successfully'
	// 			})
   //          return true
	// 		} catch (error) {
	// 			openSnackbar({
	// 				variant: 'error',
	// 				message: get(ServerMessage, error, ServerMessage.generic)
	// 			})
   //          return false
	// 		}
	// 	}, [openSnackbar])

	return {
		item: (data as Appointment) || ({} as Appointment),
		mutate: mutateThis,
		trigger: triggerThis
	}
}
