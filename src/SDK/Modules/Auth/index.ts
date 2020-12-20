import { paramsToString } from "@_utils/helpers"
import { get } from 'lodash'
import { ZenServer } from "src/SDK"
import { SigninInput, SignupInput } from "./types"

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

   async signUp (signupInput: SignupInput, fields) {
      const query = `
      mutation {
         signup(signupInput: ${paramsToString(signupInput)})${fields}
      }`
      return this._server.API({ query, name: 'signup', params: signupInput, fields })
   }

   async login (signinInput: SigninInput): Promise<string> {
      const query = `
      query {
         login(signinInput: ${paramsToString(signinInput)}){ token }
      }`
      const { token } = await this._server.API({ query, name: 'login', params: signinInput })
      if(token) this.setToken(token)
      return token
   }

   logout (_logout?: VoidFunction): void {
      window.localStorage.removeItem(this._server._LSToken)
      delete this._server._self.defaults.headers.common['Authorization']
      if (_logout) _logout()
   }
}

export default AuthServer