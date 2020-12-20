import { paramsToString } from "@_utils/helpers"
import { ZenServer } from "src/SDK"
import { FieldsToQuery } from "src/SDK/helpers"
import { GQL_PlayerType } from "./gql_type"
import { CreatePlayerInput, DeletePlayerInput, PlayerFilters, UpdatePlayerInput } from "./types"

class PlayerServer {
   private _server: ZenServer

   constructor(server: ZenServer) {
      this._server = server
   }

   async create (createPlayerInput: CreatePlayerInput) {
      const query = `
      mutation {
         createPlayer(createPlayerInput: ${paramsToString(createPlayerInput)})
      }`
      return this._server.API({ query, name: 'createPlayer', params: createPlayerInput })
   }

   async update (updatePlayerInput: UpdatePlayerInput) {
      const query = `
      mutation {
         updatePlayer(updatePlayerInput: ${paramsToString(updatePlayerInput)})
      }`
      return this._server.API({ query, name: 'updatePlayer', params: updatePlayerInput })
   }


   async delete (deletePlayerInput: DeletePlayerInput) {
      const query = `
      mutation {
         deletePlayer(deletePlayerInput: ${paramsToString(deletePlayerInput)})
      }`
      return this._server.API({ query, name: 'deletePlayer', params: deletePlayerInput })
   }


   async getList (playerFilters: PlayerFilters, fields: GQL_PlayerType) {
      const strFields = FieldsToQuery(fields, true)
      const query = `
      query {
         getPlayers(playerFilters: ${paramsToString(playerFilters)}) ${strFields}
      }`
      return this._server.API({ query, name: 'getPlayers', params: playerFilters, fields })
   }
}

export default PlayerServer