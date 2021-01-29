import { ListOf } from '@_swr/helpers'
import { zenToolboxInstance } from '@_utils/Toolbox'
import { Pagination } from 'src/SDK/types'
import { ZenServer } from '../../'
import { CreatePlayerInput, FiltersPlayer, UpdatePlayerInput } from './inputs'
import { Player } from './types'

class PlayerServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

	async create(body: CreatePlayerInput): Promise<string> {
		const query = `
      mutation {
         Player_create(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'Player_create' })
	}

	async update(body: UpdatePlayerInput): Promise<boolean> {
		const query = `
      mutation {
         Player_update(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'Player_update' })
	}

	async delete(_id: string): Promise<boolean> {
		const query = `
      mutation {
         Player_delete(_id: "${_id}")
      }`
		return this._server.API({ query, name: 'Player_delete' })
	}

	async getList(filters: FiltersPlayer, pagination: Pagination, fields: string): Promise<ListOf<Player>> {
		const query = `
      query {
         Player_getList(filters: ${zenToolboxInstance.paramsToString(filters)}, pagination: ${zenToolboxInstance.paramsToString(pagination)}) ${fields}
      }`
		return this._server.API({ query, name: 'Player_getList' })
	}
}

export default PlayerServer
