import { apiInstance } from '../SDK'
import { userFields, playerFields } from './helpers'
import { get } from 'lodash'
import { User } from '../Entities/User'
import { Player } from '../Entities/Player'

const swrFetchers = Object.freeze({
  profileFetcher: (key: string): Promise<User> => apiInstance.user_getUserConnected(userFields),
  playersFetcher: (key: string): Promise<Player[]> => apiInstance.player_getPlayers({}, playerFields),
  playerFetcher: (key: string, _id: string): Promise<Player> => apiInstance.player_getPlayers({ ..._id && { ids: [_id] } }, playerFields)
    .then(res => res ? get(res, '0', {}) : {})
})

export default swrFetchers
