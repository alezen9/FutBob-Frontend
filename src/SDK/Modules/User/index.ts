import { paramsToString } from "@_utils/helpers"
import { ZenServer } from "../../"
import { ChangePasswordInput, CreateUserInput, UpdateRegistryInput } from "./inputs"
import { User } from "./types"

class UserServer {
   private _server: ZenServer

   constructor(server: ZenServer) {
      this._server = server
   }

   async create (body: CreateUserInput): Promise<string> {
      const query = `
      mutation {
         User_create(body: ${paramsToString(body)})
      }`
      return this._server.API({ query, name: 'User_create' })
   }

   async update (body: UpdateRegistryInput): Promise<boolean> {
      const query = `
      mutation {
         User_update(body: ${paramsToString(body)})
      }`
      return this._server.API({ query, name: 'User_update' })
   }

   async getMe (fields: string): Promise<User> {
      const query = `
      query {
         User_getMe ${fields}
      }`
      return this._server.API({ query, name: 'User_getMe' })
   }

   async changeMyPassword (body: ChangePasswordInput): Promise<boolean> {
      const query = `
      mutation {
         User_changeMyPassword(body: ${paramsToString(body)})
      }`
      return this._server.API({ query, name: 'User_changeMyPassword' })
   }

   async delete (_id: string): Promise<boolean> {
      const query = `
      mutation {
         User_delete(_id: "${_id}")
      }`
      return this._server.API({ query, name: 'User_delete' })
   }
}

export default UserServer