import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { Field } from '@_SDK_Field/types'
import { allList } from './gql'

const swrFieldsFetchers = Object.freeze({
	listFetcher: (key: string, filtersKey, paginationKey: string): Promise<ListOf<Field>> =>
		apiInstance.field.getList(JSON.parse(filtersKey), JSON.parse(paginationKey), allList),
	itemFetcher: (key: string, _id: string | null): Promise<Field> =>
		_id
			? apiInstance.field
					.getList({ ...(_id && { ids: [_id] }) }, { skip: 0 }, allList)
					.then(res => (res ? (get(res, 'result.0', {}) as Field) : ({} as Field)))
			: Promise.resolve({} as Field)
})

export default swrFieldsFetchers
