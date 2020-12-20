import { paramsToString } from "@_utils/helpers"
import { ZenServer } from "src/SDK"
import { FieldsToQuery } from "src/SDK/helpers"
import { GQL_UserType } from "./gql_type"
import { UpdateUserInput } from "./types"

class UserServer {
   private _server: ZenServer

   constructor(server: ZenServer) {
      this._server = server
   }

      async getMe (fields: GQL_UserType) {
      const strFields = FieldsToQuery(fields)
      const query = `
      query {
         getUserConnected ${strFields}
      }`
      return this._server.API({ query, name: 'getUserConnected', fields })
   }

   async changeMyUsername (newUsername: string) {
      const query = `
      mutation {
         changeUsername(newUsername: "${newUsername}")
      }`
      return this._server.API({ query, name: 'changeUsername', params: { newUsername } })
   }

   async changeMyPassword (oldPassword: string, newPassword: string) {
      const query = `
      mutation {
         changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}")
      }`
      return this._server.API({ query, name: 'changePassword', params: { oldPassword, newPassword } })
   }

   async updateMe (userInput: Partial<UpdateUserInput>) {
      const query = `
      mutation {
         updateUserConnected(userInput: ${paramsToString(userInput)})
      }`
      return this._server.API({ query, name: 'updateUserConnected', params: userInput })
   }

   async update (userInput: UpdateUserInput) {
      const query = `
      mutation {
         updateUser(userInput: ${paramsToString(userInput)})
      }`
      return this._server.API({ query, name: 'updateUser', params: userInput })
   }
}

export default UserServer