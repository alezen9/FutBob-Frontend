import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { allList } from './gql'
import { Player } from '@_SDK_Player/types'

const swrPlayersFetchers = Object.freeze({
	listFetcher: (key: string, filtersKey: string, pagination: string, sortKey: string): Promise<ListOf<Player>> =>
		apiInstance.player.getList(JSON.parse(filtersKey), JSON.parse(pagination), JSON.parse(sortKey), allList),
	itemFetcher: (key: string, _id: string | null): Promise<Player> =>
		_id
			? apiInstance.player
					.getList({ ...(_id && { ids: [_id] }) }, { skip: 0 }, {}, allList)
					.then(res => get(res, 'result.0', {}) as Player)
			: Promise.resolve({} as Player)
})

export default swrPlayersFetchers
