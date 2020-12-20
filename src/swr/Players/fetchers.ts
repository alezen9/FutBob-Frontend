import { get } from 'lodash'
import { Player } from '@_SDK_Player/entities'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { player_allFields } from 'src/SDK/Modules/Player/gql_all'

const swrPlayersFetchers = Object.freeze({
  playersFetcher: (key: string, filtersKey): Promise<ListOf<Player>> => apiInstance.player.getList(JSON.parse(filtersKey), player_allFields),
  playerFetcher: (key: string, _id: string | null): Promise<Player> => _id
    ? apiInstance.player.getList({ ..._id && { ids: [_id] } }, player_allFields)
         .then(res => res ? get(res, 'result.0', {}) as Player : {} as Player)
    : Promise.resolve({} as Player)
})

export default swrPlayersFetchers
