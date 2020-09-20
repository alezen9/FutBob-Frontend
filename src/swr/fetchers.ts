import { apiInstance } from '../SDK'
import { get } from 'lodash'
import { User } from '../Entities/User'
import { Player } from '../Entities/Player'
import { allUserFields, allPlayerFields } from '../SDK/allFields'

const swrFetchers = Object.freeze({
  profileFetcher: (key: string): Promise<User> => apiInstance.user_getUserConnected(allUserFields),
  playersFetcher: (key: string): Promise<Player[]> => apiInstance.player_getPlayers({}, allPlayerFields),
  playerFetcher: (key: string, _id: string | null): Promise<Player> => apiInstance.player_getPlayers({ ..._id && { ids: [_id] } }, allPlayerFields)
    .then(res => res ? get(res, '0', {}) : {})
})

export default swrFetchers
