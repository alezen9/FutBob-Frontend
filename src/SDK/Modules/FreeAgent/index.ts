import { ListOf } from "@_swr/helpers"
import { paramsToString } from "@_utils/helpers"
import { Pagination } from "src/SDK/types"
import { ZenServer } from "../../"
import { FreeAgent } from "./types"
import { CreateFreeAgentInput, FiltersFreeAgent, UpdateFreeAgentInput } from "./inputs"

class FreeAgentServer {
   private _server: ZenServer

   constructor(server: ZenServer) {
      this._server = server
   }

   async create(body: CreateFreeAgentInput): Promise<string> {
      const query = `
      mutation {
         FreeAgent_create(body: ${paramsToString(body)})
      }`
      return this._server.API({ query, name: 'FreeAgent_create' })
   }

   async update(body: UpdateFreeAgentInput): Promise<boolean> {
      const query = `
      mutation {
         FreeAgent_update(body: ${paramsToString(body)})
      }`
      return this._server.API({ query, name: 'FreeAgent_update' })
   }

   async delete(_id: string): Promise<boolean> {
      const query = `
      mutation {
         FreeAgent_delete(_id: "${_id}")
      }`
      return this._server.API({ query, name: 'FreeAgent_delete' })
   }

  async getList(filters: FiltersFreeAgent, pagination: Pagination, fields: string): Promise<ListOf<FreeAgent>> {
      const query = `
         query {
            FreeAgent_getList(filters: ${paramsToString(filters)}, pagination: ${paramsToString(pagination)}) ${fields}
         }`
      return this._server.API({ query, name: 'FreeAgent_getList' })
   }
}

export default FreeAgentServer