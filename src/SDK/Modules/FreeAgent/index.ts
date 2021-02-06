import { ListOf } from '@_swr/helpers'
import { Pagination } from 'src/SDK/types'
import { ZenServer } from '../../'
import { FreeAgent } from './types'
import { CreateFreeAgentInput, FiltersFreeAgent, UpdateFreeAgentInput } from './inputs'
import { zenToolboxInstance } from '@_utils/Toolbox'

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
		const query = `
      mutation {
         FreeAgent_update(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'FreeAgent_update', params: body })
	}

	async delete(_id: string): Promise<boolean> {
		const query = `
      mutation {
         FreeAgent_delete(_id: "${_id}")
      }`
		return this._server.API({ query, name: 'FreeAgent_delete', params: _id })
	}

	async getList(filters: FiltersFreeAgent, pagination: Pagination, fields: string): Promise<ListOf<FreeAgent>> {
		const query = `
         query {
            FreeAgent_getList(filters: ${zenToolboxInstance.paramsToString(filters)}, pagination: ${zenToolboxInstance.paramsToString(pagination)}) ${fields}
         }`
		return this._server.API({ query, name: 'FreeAgent_getList', params: { filters, pagination }, fields })
	}
}

export default FreeAgentServer
