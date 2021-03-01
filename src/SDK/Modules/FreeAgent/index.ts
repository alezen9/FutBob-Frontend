import { ListOf } from '@_swr/helpers'
import { Pagination } from 'src/SDK/types'
import { ZenServer } from '../../'
import { FreeAgent } from './types'
import { CreateFreeAgentInput, FiltersFreeAgent, UpdateFreeAgentInput } from './inputs'
import { zenToolboxInstance } from '@_utils/Toolbox'
import { get } from 'lodash'
import { CreatePlayerInput } from '@_SDK_Player/inputs'

class FreeAgentServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

	async create(body: CreateFreeAgentInput): Promise<string> {
		const query = `
      mutation {
         FreeAgent_create(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'FreeAgent_create', params: body })
	}

	async update(body: UpdateFreeAgentInput): Promise<boolean> {
      const revisedBody = { ...body, _id: String(body._id) }
		const query = `
      mutation {
         FreeAgent_update(body: ${zenToolboxInstance.paramsToString(revisedBody)})
      }`
		return this._server.API({ query, name: 'FreeAgent_update', params: revisedBody })
	}

	async delete(_id: string): Promise<boolean> {
		const query = `
      mutation {
         FreeAgent_delete(_id: "${_id}")
      }`
		return this._server.API({ query, name: 'FreeAgent_delete', params: String(_id) })
	}

   async registerAsPlayer(_id: string, body: CreatePlayerInput): Promise<string> {
		const query = `
      mutation {
         FreeAgent_registerAsPlayer(_id: "${_id}", body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'FreeAgent_registerAsPlayer', params: String(_id) })
	}

	async getList(filters: FiltersFreeAgent, pagination: Pagination, fields: string): Promise<ListOf<FreeAgent>> {
      const revisedFilters = { ...filters, ids: (get(filters, 'ids', []) || []).map((_id: string|number) => String(_id)) }
		const query = `
         query {
            FreeAgent_getList(filters: ${zenToolboxInstance.paramsToString(revisedFilters)}, pagination: ${zenToolboxInstance.paramsToString(pagination)}) ${fields}
         }`
		return this._server.API({ query, name: 'FreeAgent_getList', params: { filters: revisedFilters, pagination }, fields })
	}
}

export default FreeAgentServer
