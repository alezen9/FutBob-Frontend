import { apiInstance } from '../src/SDK'
import { userFields, playerFields } from './helpers'
import { get } from 'lodash'

const swrFetchers = Object.freeze({
  profileFetcher: key => apiInstance.user_getUserConnected(userFields),
  playersFetcher: key => apiInstance.player_getPlayers({}, playerFields),
  playerFetcher: (key, _id) => apiInstance.player_getPlayers({ ..._id && { ids: [_id] } }, playerFields)
    .then(res => res ? get(res, '0', {}) : {})
})

export default swrFetchers
