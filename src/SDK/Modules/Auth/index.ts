import { get } from 'lodash'
import { ZenServer } from '../../'
import { AuthData } from './types'
import { LoginInput, RegisterInput } from './inputs'
import { zenToolboxInstance } from '@_utils/Toolbox'

class AuthServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

	setToken(token: string) {
		const tokenSet = get(this._server._self, 'defaults.headers.common.Authorization', undefined)
		let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
		if (token !== _token) {
			this._server._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
		}
		window.localStorage.setItem(this._server._LSToken, token)
	}

	hasToken(): boolean {
		return !!(
			get(this._server._self, 'defaults.headers.common.Authorization', undefined) ||
			(process.browser && window.localStorage.getItem(this._server._LSToken))
		)
   }

   async isTokenValid(token: string): Promise<boolean> {
      const query = `
      query {
         Auth_isTokenValid(token: "${token}")
      }`
      return this._server.API({ query, name: 'Auth_isTokenValid' })
   }

	async register(body: RegisterInput): Promise<boolean> {
		const query = `
      mutation {
         Auth_register(body: ${zenToolboxInstance.paramsToString(body)})
      }`
		return this._server.API({ query, name: 'Auth_register' })
	}

	async confirm(code: string): Promise<AuthData> {
		const query = `
      query {
         Auth_confirm(code: "${code}") { token }
      }`
		return this._server.API({ query, name: 'Auth_confirm' })
	}

	async login(body: LoginInput): Promise<AuthData> {
		const query = `
      query {
         Auth_login(body: ${zenToolboxInstance.paramsToString(body)}) { token }
      }`
		return this._server.API({ query, name: 'Auth_login' })
   }
   
   logout (_logout?: VoidFunction): void {
      window.localStorage.removeItem(this._server._LSToken)
      delete this._server._self.defaults.headers.common['Authorization']
      if (_logout) _logout()
   }
}

export default AuthServer
