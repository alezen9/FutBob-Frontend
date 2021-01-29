import { ListOf } from '@_swr/helpers'
import { Pagination } from 'src/SDK/types'
import { ZenServer } from '../../'
import { Field } from './types'
import { CreateFieldInput, FiltersField, UpdateFieldInput } from './inputs'
import { zenToolboxInstance } from '@_utils/Toolbox'

class FieldServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

	async create(body: CreateFieldInput): Promise<string> {
		const query = `
      mutation {
         Field_create(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'Field_create' })
	}

	async update(body: UpdateFieldInput): Promise<boolean> {
		const query = `
      mutation {
         Field_update(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'Field_update' })
	}

	async delete(_id: string): Promise<boolean> {
		const query = `
      mutation {
         Field_delete(_id: "${_id}")
      }`
		return this._server.API({ query, name: 'Field_delete' })
	}

	async getList(filters: FiltersField, pagination: Pagination, fields: string): Promise<ListOf<Field>> {
		const query = `
      query {
         Field_getList(filters: ${zenToolboxInstance.paramsToString(filters)}, pagination: ${zenToolboxInstance.paramsToString(pagination)}) ${fields}
      }`
		return this._server.API({ query, name: 'Field_getList' })
	}
}

export default FieldServer
