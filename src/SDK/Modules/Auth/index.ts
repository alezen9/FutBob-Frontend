import { get } from 'lodash'
import { ZenServer } from '../../'
import { AuthData } from './types'
import { FinalizeRegistrationInput, LoginInput, RegisterInput, RequestResendInput } from './inputs'
import zenToolbox from '@_utils/toolbox'

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
      return this._server.API({ query, name: 'Auth_isTokenValid', params: token })
   }

	async login(body: LoginInput): Promise<AuthData> {
		const query = `
      query {
         Auth_login(body: ${zenToolbox.paramsToString(body)}) { token }
      }`
		return this._server.API({ query, name: 'Auth_login', params: body })
   }

   /** Start registration flow */
   async requestRegistration(body: RegisterInput): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestRegistration(body: ${zenToolbox.paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Auth_requestRegistration', params: body })
   }

   async requestRegistrationEmailResend(expiredCode: string): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestRegistrationEmailResend(expiredCode: "${expiredCode}")
      }`
      return this._server.API({ query, name: 'Auth_requestRegistrationEmailResend', params: expiredCode })
   }

   async finalizeRegistration(body: FinalizeRegistrationInput): Promise<AuthData> {
      const query = `
      mutation {
         Auth_finalizeRegistration(body: ${zenToolbox.paramsToString(body)}) { token }
      }`
      return this._server.API({ query, name: 'Auth_finalizeRegistration', params: body, fields: '{ token }' })
   }
   /** End registration flow */



   /** Start reset password flow */
   async requestResetPassword(email: string): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestResetPassword(email: "${email}")
      }`
      return this._server.API({ query, name: 'Auth_requestResetPassword', params: email, })
   }

   async requestResetPasswordEmailResend(expiredCode: string): Promise<boolean> {
      const query = `
      mutation {
         Auth_requestResetPasswordEmailResend(expiredCode: "${expiredCode}")
      }`
      return this._server.API({ query, name: 'Auth_requestResetPasswordEmailResend', params: expiredCode })
   }

   async finalizeResetPassword(body: FinalizeRegistrationInput): Promise<AuthData> {
      const query = `
      mutation {
         Auth_finalizeResetPassword(body: ${zenToolbox.paramsToString(body)}) { token }
      }`
      return this._server.API({ query, name: 'Auth_finalizeResetPassword', params: body, fields: '{ token }' })
   }
   /** End reset password flow */
   
   logout (_logout?: VoidFunction): void {
      window.localStorage.removeItem(this._server._LSToken)
      delete this._server._self.defaults.headers.common['Authorization']
      if (_logout) _logout()
   }
}

export default AuthServer
