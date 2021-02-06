import { get } from 'lodash'
import { ZenServer } from '../../'
import { AuthData } from './types'
import { FinalizeRegistrationInput, LoginInput, RegisterInput, RequestResendInput } from './inputs'
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

	async login(body: LoginInput): Promise<AuthData> {
		const query = `
      query {
         Auth_login(body: ${zenToolboxInstance.paramsToString(body)}) { token }
      }`
		return this._server.API({ query, name: 'Auth_login' })
   }

   /** Start registration flow */
   async requestRegistration(body: RegisterInput): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestRegistration(body: ${zenToolboxInstance.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Auth_requestRegistration' })
   }

   async requestRegistrationEmailResend(body: RequestResendInput): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestRegistrationEmailResend(body: ${zenToolboxInstance.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Auth_requestRegistrationEmailResend' })
   }

   async finalizeRegistration(body: FinalizeRegistrationInput): Promise<AuthData> {
      const query = `
      mutation {
         Auth_finalizeRegistration(body: ${zenToolboxInstance.paramsToString(body)}) { token }
      }`
      return this._server.API({ query, name: 'Auth_finalizeRegistration' })
   }
   /** End registration flow */



   /** Start reset password flow */
   async requestResetPassword(email: string): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestResetPassword(email: "${email}")
      }`
      return this._server.API({ query, name: 'Auth_requestResetPassword' })
   }

   async requestResetPasswordEmailResend(body: RequestResendInput): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestResetPasswordEmailResend(body: ${zenToolboxInstance.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Auth_requestResetPasswordEmailResend' })
   }

   async finalizeResetPassword(body: FinalizeRegistrationInput): Promise<AuthData> {
      const query = `
      mutation {
         Auth_finalizeResetPassword(body: ${zenToolboxInstance.paramsToString(body)}) { token }
      }`
      return this._server.API({ query, name: 'Auth_finalizeResetPassword' })
   }
   /** End reset password flow */
   
   logout (_logout?: VoidFunction): void {
      window.localStorage.removeItem(this._server._LSToken)
      delete this._server._self.defaults.headers.common['Authorization']
      if (_logout) _logout()
   }
}

export default AuthServer
