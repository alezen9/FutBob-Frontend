import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { player_allFields } from '@_SDK_Player/gql_all'
import { Player } from '@_SDK_Player/types'

const swrPlayersFetchers = Object.freeze({
	listFetcher: (key: string, filtersKey: string, pagination: string): Promise<ListOf<Player>> =>
		apiInstance.player.getList(JSON.parse(filtersKey), JSON.parse(pagination), player_allFields),
	itemFetcher: (key: string, _id: string | null): Promise<Player> =>
		_id
			? apiInstance.player
					.getList({ ...(_id && { ids: [_id] }) }, { skip: 0 }, player_allFields)
					.then(res => get(res, 'result.0', {}) as Player)
			: Promise.resolve({} as Player)
})

export default swrPlayersFetchers
