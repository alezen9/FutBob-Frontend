import { paramsToString } from '@_utils/helpers'
import { get } from 'lodash'
import { ZenServer } from "../../"
import { AuthData } from './types'
import { LoginInput, RegisterInput } from './inputs'

class AuthServer {
   private _server: ZenServer

   constructor(server: ZenServer) {
      this._server = server
   }

   setToken (token: string) {
      const tokenSet = get(this._server._self, 'defaults.headers.common.Authorization', undefined)
      let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
      if (token !== _token) {
      this._server._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      window.localStorage.setItem(this._server._LSToken, token)
   }

   hasToken (): boolean {
      return !!(get(this._server._self, 'defaults.headers.common.Authorization', undefined) || (process.browser && window.localStorage.getItem(this._server._LSToken)))
   }

   async register(body: RegisterInput): Promise<boolean> {
      const query = `
      mutation {
         Auth_register(body: ${paramsToString(body)})
      }`
      return this._server.API({ query, name: 'Auth_register' })
   }

   async confirm(code: string, fields: string): Promise<AuthData> {
      const query = `
      query {
         Auth_confirm(code: "${code}")${fields}
      }`
      return this._server.API({ query, name: 'Auth_confirm' })
   }

   async login(body: LoginInput, fields: string): Promise<AuthData> {
      const query = `
      query {
         Auth_login(body: ${paramsToString(body)})${fields}
      }`
      return this._server.API({ query, name: 'Auth_login' })
   }
}

export default AuthServer