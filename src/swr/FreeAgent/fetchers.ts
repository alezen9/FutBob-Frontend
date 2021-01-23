import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { freeAgent_allFields } from 'src/SDK/Modules/FreeAgent/gql_all'
import { FreeAgent } from '@_SDK_FreeAgent/types'

const swrFreeAgentFetchers = Object.freeze({
	listFetcher: (key: string, filtersKey: string, paginationKey: string): Promise<ListOf<FreeAgent>> =>
		apiInstance.freeAgent.getList(JSON.parse(filtersKey), JSON.parse(paginationKey), freeAgent_allFields),
	itemFetcher: (key: string, _id: string | null): Promise<FreeAgent> =>
		_id
			? apiInstance.freeAgent
					.getList({ ...(_id && { ids: [_id] }) }, { skip: 0 }, freeAgent_allFields)
					.then(res => get(res, 'result.0', {}) as FreeAgent)
			: Promise.resolve({} as FreeAgent)
})

export default swrFreeAgentFetchers
