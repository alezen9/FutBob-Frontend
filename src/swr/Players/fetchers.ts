import { get } from 'lodash'
import { Player } from '@_entities/Player'
import { apiInstance } from 'src/SDK'
import { allPlayerFields } from 'src/SDK/allFields'

const swrPlayersFetchers = Object.freeze({
  playersFetcher: (key: string): Promise<Player[]> => apiInstance.player_getPlayers({}, allPlayerFields),
  playerFetcher: (key: string, _id: string | null): Promise<Player> => _id
    ? apiInstance.player_getPlayers({ ..._id && { ids: [_id] } }, allPlayerFields)
         .then(res => res ? get(res, '0', {}) as Player : {} as Player)
    : Promise.resolve({} as Player)
})

export default swrPlayersFetchers
