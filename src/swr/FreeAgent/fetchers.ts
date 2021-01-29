import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { FreeAgent } from '@_SDK_FreeAgent/types'
import { allList } from './gql'

const swrFreeAgentFetchers = Object.freeze({
	listFetcher: (key: string, filtersKey: string, paginationKey: string): Promise<ListOf<FreeAgent>> =>
		apiInstance.freeAgent.getList(JSON.parse(filtersKey), JSON.parse(paginationKey), allList),
	itemFetcher: (key: string, _id: string | null): Promise<FreeAgent> =>
		_id
			? apiInstance.freeAgent
					.getList({ ...(_id && { ids: [_id] }) }, { skip: 0 }, allList)
					.then(res => get(res, 'result.0', {}) as FreeAgent)
			: Promise.resolve({} as FreeAgent)
})

export default swrFreeAgentFetchers
