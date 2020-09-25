import { apiInstance } from '../SDK'
import { get } from 'lodash'
import { User } from '@_myentities/User'
import { Player } from '@_myentities/Player'
import { allUserFields, allPlayerFields } from '../SDK/allFields'

const swrFetchers = Object.freeze({
  profileFetcher: (key: string): Promise<User> => apiInstance.user_getUserConnected(allUserFields),
  playersFetcher: (key: string): Promise<Player[]> => apiInstance.player_getPlayers({}, allPlayerFields),
  playerFetcher: (key: string, _id: string | null): Promise<Player> => _id
    ? apiInstance.player_getPlayers({ ..._id && { ids: [_id] } }, allPlayerFields)
        .then(res => res ? get(res, '0', {}) as Player : {} as Player)
    : Promise.resolve({} as Player)
})

export default swrFetchers
