import { ListOf } from '@_swr/helpers'
import zenToolbox from '@_utils/toolbox'
import { Pagination } from 'src/SDK/types'
import { ZenServer } from '../../'
import { CreateAppointmentInput, FiltersAppointment, SetMpvManuallyInput, UpdateAppointmentInvitesInput, UpdateAppointmentMainInput, UpdateAppointmentMatchesInput, UpdateAppointmentStateInput, UpdateAppointmentStatsInput } from './inputs'
import { Appointment } from './types'

class AppointmentServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

   async create(body: CreateAppointmentInput): Promise<string> {
      const query = `
      mutation {
         Appointment_create(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Appointment_create', params: body })
   }

   async updateMainInfo(body: UpdateAppointmentMainInput): Promise<boolean> {
      const query = `
      mutation {
         Appointment_UpdateMainInfo(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateMainInfo', params: body })
   }

   async updateState(body: UpdateAppointmentStateInput): Promise<boolean> {
      const query = `
      mutation {
         Appointment_UpdateState(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateState', params: body })
   }

   async updateStats(body: UpdateAppointmentStatsInput): Promise<boolean> {
      const query = `
      mutation {
         Appointment_UpdateStats(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateStats', params: body })
   }

   async updateSetMvpManually(body: SetMpvManuallyInput): Promise<boolean> {
      const query = `
      mutation {
         Appointment_SetMpvManually(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Appointment_SetMpvManually', params: body })
   }

   async updateInvites(body: UpdateAppointmentInvitesInput): Promise<boolean> {
      const query = `
      mutation {
         Appointment_UpdateInvites(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateInvites', params: body })
   }

   async updateMatches(body: UpdateAppointmentMatchesInput): Promise<boolean> {
      const query = `
      mutation {
         Appointment_UpdateMatches(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateMatches', params: body })
   }

  async getList(filters: FiltersAppointment, pagination: Pagination, fields: string): Promise<ListOf<Appointment>> {
      const query = `
         query {
            Appointment_getList(filters: ${zenToolbox.paramsToString(filters)}, pagination: ${zenToolbox.paramsToString(pagination)}) ${fields}
         }`
      return this._server.API({ query, name: 'Appointment_getList', params: { filters, pagination }, fields })
   }

}

export default AppointmentServer
