import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf, SwrKey } from '@_swr/helpers'
import { allList } from './gql'
import { Player } from '@_SDK_Player/types'

// Tuple key types for clarity
type PlayersKey = readonly [SwrKey.PLAYERS, string, string, string]
type PlayerKey  = readonly [SwrKey.PLAYER, string | null | undefined]

const swrPlayersFetchers = Object.freeze({
  // receives ONE argument: the whole tuple
  listFetcher: ([, filtersKey, paginationKey, sortKey]: PlayersKey): Promise<ListOf<Player>> =>
    apiInstance.player.getList(
      JSON.parse(filtersKey),
      JSON.parse(paginationKey),
      JSON.parse(sortKey),
      allList
    ),

  // receives ONE argument: the whole tuple
  itemFetcher: ([, _id]: PlayerKey): Promise<Player> =>
    _id
      ? apiInstance.player
          .getList({ ids: [_id] }, { skip: 0 }, {}, allList)
          .then(res => get(res, 'result.0', {}) as Player)
      : Promise.resolve({} as Player)
})

export default swrPlayersFetchers