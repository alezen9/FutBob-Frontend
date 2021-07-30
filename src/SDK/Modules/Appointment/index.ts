import { ListOf } from '@_swr/helpers'
import zenToolbox from '@_utils/toolbox'
import { get } from 'lodash'
import { Pagination } from 'src/SDK/types'
import { ZenServer } from '../../'
import { CreateAppointmentInput, FiltersAppointment, SetMpvManuallyInput, SortAppointment, UpdateAppointmentInvitesInput, UpdateAppointmentMainInput, UpdateAppointmentMatchesInput, UpdateAppointmentStateInput, UpdateAppointmentStatsInput } from './inputs'
import { Appointment } from './types'

class AppointmentServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

   async create(body: CreateAppointmentInput): Promise<string> {
      const revisedBody = {
         ...body,
         field: String(body.field),
         ...body.invites && {
            invites: {
               ...body.invites.confirmed && {
                  confirmed: body.invites.confirmed.map(player => ({ ...player, _id: String(player._id) }))
               },
               ...body.invites.invited && {
                  invited: body.invites.invited.map(String)
               }
            }
         }
      }
      const query = `
      mutation {
         Appointment_create(body: ${zenToolbox.paramsToString(revisedBody)})
      }`
      return this._server.API({ query, name: 'Appointment_create', params: revisedBody })
   }

   async updateMainInfo(body: UpdateAppointmentMainInput): Promise<boolean> {
      const revisedBody = {
         ...body,
         _id: String(body._id),
         ...body.field && { field: String(body.field) }
      }
      const query = `
      mutation {
         Appointment_UpdateMainInfo(body: ${zenToolbox.paramsToString(revisedBody)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateMainInfo', params: revisedBody })
   }

   async updateState(body: UpdateAppointmentStateInput): Promise<boolean> {
      const revisedBody = {
         ...body,
         _id: String(body._id)
      }
      const query = `
      mutation {
         Appointment_UpdateState(body: ${zenToolbox.paramsToString(revisedBody)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateState', params: revisedBody })
   }

   async updateStats(body: UpdateAppointmentStatsInput): Promise<boolean> {
      const revisedBody = {
         ...body,
         _id: String(body._id),
         stats: {
            individualStats: body.stats.individualStats.map(stats => ({
               ...stats,
               player: {
                  ...stats.player,
                  _id: String(stats.player._id)
               }
            }))
         }
      }
      const query = `
      mutation {
         Appointment_UpdateStats(body: ${zenToolbox.paramsToString(revisedBody)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateStats', params: revisedBody })
   }

   async updateSetMvpManually(body: SetMpvManuallyInput): Promise<boolean> {
      const revisedBody = {
         ...body,
         _id: String(body._id),
         mvpId: String(body.mvpId)
      }
      const query = `
      mutation {
         Appointment_SetMpvManually(body: ${zenToolbox.paramsToString(revisedBody)})
      }`
      return this._server.API({ query, name: 'Appointment_SetMpvManually', params: revisedBody })
   }

   async updateInvites(body: UpdateAppointmentInvitesInput): Promise<boolean> {
       const revisedBody: UpdateAppointmentInvitesInput = {
         ...body,
         _id: String(body._id),
         ...body.invites && {
            invites: {
               ...body.invites.invited && {
                  invited: body.invites.invited.map(String)
               },
               ...body.invites.confirmed && {
                  confirmed: body.invites.confirmed.map(player => ({ ...player, _id: String(player._id) }))
               },
               ...body.invites.blacklisted && {
                  blacklisted: body.invites.blacklisted.map(player => ({ ...player, _id: String(player._id) }))
               }
            }
         }
       }
      const query = `
      mutation {
         Appointment_UpdateInvites(body: ${zenToolbox.paramsToString(revisedBody)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateInvites', params: revisedBody })
   }

   async updateMatches(body: UpdateAppointmentMatchesInput): Promise<boolean> {
      const revisedBody = {
         ...body,
         _id: String(body._id),
         matches: body.matches.map(match => ({
            ...match,
            teamA: {
               ...match.teamA,
               players: match.teamA.players.map(player => ({ ...player, _id: String(player._id) }))
            },
            teamB: {
               ...match.teamA,
               players: match.teamA.players.map(player => ({ ...player, _id: String(player._id) }))
            }
         }))
      }
      const query = `
      mutation {
         Appointment_UpdateMatches(body: ${zenToolbox.paramsToString(revisedBody)})
      }`
      return this._server.API({ query, name: 'Appointment_UpdateMatches', params: revisedBody })
   }

  async getList(filters: FiltersAppointment, pagination: Pagination, sort: SortAppointment, fields: string): Promise<ListOf<Appointment>> {
   const revisedFilters = { ...filters, ids: (get(filters, 'ids', []) || []).map((_id: string|number) => String(_id)) }   
   const query = `
         query {
            Appointment_getList(filters: ${zenToolbox.paramsToString(revisedFilters)}, pagination: ${zenToolbox.paramsToString(pagination)}) ${fields}
         }`
      return this._server.API({ query, name: 'Appointment_getList', params: { filters: revisedFilters, pagination, sort }, fields })
   }

}

export default AppointmentServer
