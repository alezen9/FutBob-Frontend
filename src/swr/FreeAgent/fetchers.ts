import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { freeAgent_allFields } from 'src/SDK/Modules/FreeAgent/gql_all'
import { FreeAgent } from 'src/SDK/Modules/FreeAgent/entities'

const swrFreeAgentFetchers = Object.freeze({
  freeAgentsFetcher: (key: string, filtersKey): Promise<ListOf<FreeAgent>> => apiInstance.freeAgent.getList(JSON.parse(filtersKey), freeAgent_allFields),
  freeAgentFetcher: (key: string, _id: string | null): Promise<FreeAgent> => _id
    ? apiInstance.freeAgent.getList({ ..._id && { ids: [_id] } }, freeAgent_allFields)
         .then(res => res ? get(res, 'result.0', {}) as FreeAgent : {} as FreeAgent)
    : Promise.resolve({} as FreeAgent)
})

export default swrFreeAgentFetchers
