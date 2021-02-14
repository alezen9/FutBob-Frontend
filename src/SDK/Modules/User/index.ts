import { zenToolboxInstance } from '@_utils/Toolbox'
import { ZenServer } from '../../'
import { ChangePasswordInput, CreateUserInput, UpdateRegistryInput } from './inputs'
import { User } from './types'

class UserServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

	async create(body: CreateUserInput): Promise<string> {
		const query = `
      mutation {
         User_create(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'User_create', params: body })
	}

	async update(body: UpdateRegistryInput): Promise<boolean> {
      const revisedBody = { ...body, _id: String(body._id) }
		const query = `
      mutation {
         User_update(body: ${zenToolboxInstance.paramsToString(revisedBody)})
      }`
		return this._server.API({ query, name: 'User_update', params: revisedBody })
	}

	async getMe(fields: string): Promise<User> {
		const query = `
      query {
         User_getMe ${fields}
      }`
		return this._server.API({ query, name: 'User_getMe', fields })
	}

	async changeMyPassword(body: ChangePasswordInput): Promise<boolean> {
		const query = `
      mutation {
         User_changeMyPassword(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'User_changeMyPassword', params: body })
	}

   async changeMyEmail(newEmail: string): Promise<boolean> {
		const query = `
      mutation {
         User_changeMyEmail(newEmail: "${newEmail}")
      }`
		return this._server.API({ query, name: 'User_changeMyEmail', params: newEmail })
	}

	async delete(_id: string): Promise<boolean> {
		const query = `
      mutation {
         User_delete(_id: "${_id}")
      }`
		return this._server.API({ query, name: 'User_delete', params: String(_id) })
	}
}

export default UserServer
