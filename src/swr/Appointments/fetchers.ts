import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { allList } from './gql'
import { Appointment } from 'src/SDK/Modules/Appointment/types'

const swrAppointmentsFetchers = Object.freeze({
	listFetcher: (key: string, filtersKey: string, pagination: string, sortKey: string): Promise<ListOf<Appointment>> =>
		apiInstance.appointment.getList(JSON.parse(filtersKey), JSON.parse(pagination), JSON.parse(sortKey), allList),
	itemFetcher: (key: string, _id: string | null): Promise<Appointment> =>
		_id
			? apiInstance.appointment
					.getList({ ...(_id && { ids: [_id] }) }, { skip: 0 }, {}, allList)
					.then(res => get(res, 'result.0', {}) as Appointment)
			: Promise.resolve({} as Appointment)
})

export default swrAppointmentsFetchers
