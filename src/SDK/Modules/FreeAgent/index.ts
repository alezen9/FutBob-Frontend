import { paramsToString } from "@_utils/helpers"
import { ZenServer } from "src/SDK"
import { FieldsToQuery } from "src/SDK/helpers"
import { GQL_FreeAgentType } from "./gql_type"
import { CreateFreeAgentInput, FreeAgentFilters, UpdateFreeAgentInput } from "./types"

class FreeAgentServer {
   private _server: ZenServer

   constructor(server: ZenServer) {
      this._server = server
   }

   async create(createFreeAgentInput: CreateFreeAgentInput): Promise<any> {
      const query = `
      mutation {
         createFreeAgent(createFreeAgentInput: ${paramsToString(createFreeAgentInput)})
      }`
      return this._server.API({ query, name: 'createFreeAgent' })
   }

   async update(updateFreeAgentInput: UpdateFreeAgentInput): Promise<any> {
      const query = `
      mutation {
         updateFreeAgent(updateFreeAgentInput: ${paramsToString(updateFreeAgentInput)})
      }`
      return this._server.API({ query, name: 'updateFreeAgent' })
   }

   async delete(_id: string): Promise<any> {
      const query = `
      mutation {
         deleteFreeAgent(_id: "${_id}")
      }`
      return this._server.API({ query, name: 'deleteFreeAgent' })
   }

  async getList(freeAgentFilters: FreeAgentFilters, fields: GQL_FreeAgentType): Promise<any> {
      const strFields = FieldsToQuery(fields, true)
      const query = `
         query {
            getFreeAgents(freeAgentFilters: ${paramsToString(freeAgentFilters)}) ${strFields}
         }`
      return this._server.API({ query, name: 'getFreeAgents' })
   }
}

export default FreeAgentServer