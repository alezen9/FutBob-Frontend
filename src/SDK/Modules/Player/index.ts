import { ListOf } from '@_swr/helpers'
import { zenToolboxInstance } from '@_utils/Toolbox'
import { get } from 'lodash'
import { Pagination } from 'src/SDK/types'
import { ZenServer } from '../../'
import { CreatePlayerInput, FiltersPlayer, SortPlayer, UpdatePlayerInput } from './inputs'
import { Player } from './types'

class PlayerServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

	async create(body: CreatePlayerInput): Promise<string> {
      const revisedBody = { ...body, user: String(body.user) }
		const query = `
      mutation {
         Player_create(body: ${zenToolboxInstance.paramsToString(revisedBody)})
      }`
		return this._server.API({ query, name: 'Player_create', params: revisedBody })
	}

	async update(body: UpdatePlayerInput): Promise<boolean> {
      const revisedBody = { ...body, _id: String(body._id) }
		const query = `
      mutation {
         Player_update(body: ${zenToolboxInstance.paramsToString(revisedBody)})
      }`
		return this._server.API({ query, name: 'Player_update', params: revisedBody })
	}

	async delete(_id: string): Promise<boolean> {
		const query = `
      mutation {
         Player_delete(_id: "${_id}")
      }`
		return this._server.API({ query, name: 'Player_delete', params: String(_id) })
	}

	async getList(filters: FiltersPlayer, pagination: Pagination, sort: SortPlayer, fields: string): Promise<ListOf<Player>> {
      const revisedFilters = { ...filters, ids: (get(filters, 'ids', []) || []).map((_id: string|number) => String(_id)) }
		const query = `
      query {
         Player_getList(filters: ${zenToolboxInstance.paramsToString(revisedFilters)}, pagination: ${zenToolboxInstance.paramsToString(pagination)}, sort: ${zenToolboxInstance.paramsToString(sort)}) ${fields}
      }`
		return this._server.API({ query, name: 'Player_getList', params: { filters: revisedFilters, pagination, sort }, fields })
	}
}

export default PlayerServer
