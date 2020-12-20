import { paramsToString } from "@_utils/helpers"
import { ZenServer } from "src/SDK"
import { FieldsToQuery } from "src/SDK/helpers"
import { GQL_FieldType } from "./gql_type"
import { CreateFieldInput, FieldFilters, UpdateFieldInput } from "./types"

class FieldServer {
   private _server: ZenServer

   constructor(server: ZenServer) {
      this._server = server
   }

   async create(createFieldInput: CreateFieldInput): Promise<any> {
      const query = `
      mutation {
         createField(createFieldInput: ${paramsToString(createFieldInput)})
      }`
      return this._server.API({ query, name: 'createField' })
   }

   async update(updateFieldInput: UpdateFieldInput): Promise<any> {
      const query = `
      mutation {
         updateField(updateFieldInput: ${paramsToString(updateFieldInput)})
      }`
      return this._server.API({ query, name: 'updateField' })
   }

   async delete(_id: string): Promise<any> {
      const query = `
      mutation {
         deleteField(_id: "${_id}")
      }`
      return this._server.API({ query, name: 'deleteField' })
   }

   async getList(fieldsFilters: FieldFilters, fields: GQL_FieldType): Promise<any> {
      const strFields = FieldsToQuery(fields, true)
      const query = `
      query {
         getFields(fieldsFilters: ${paramsToString(fieldsFilters)}) ${strFields}
      }`
      return this._server.API({ query, name: 'getFields', params: fieldsFilters, fields })
   }
}

export default FieldServer