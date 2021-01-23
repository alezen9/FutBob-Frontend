import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { field_allFields } from '@_SDK_Field/gql_all'
import { Field } from '@_SDK_Field/types'

const swrFieldsFetchers = Object.freeze({
	listFetcher: (key: string, filtersKey, paginationKey: string): Promise<ListOf<Field>> =>
		apiInstance.field.getList(JSON.parse(filtersKey), JSON.parse(paginationKey), field_allFields),
	itemFetcher: (key: string, _id: string | null): Promise<Field> =>
		_id
			? apiInstance.field
					.getList({ ...(_id && { ids: [_id] }) }, { skip: 0 }, field_allFields)
					.then(res => (res ? (get(res, 'result.0', {}) as Field) : ({} as Field)))
			: Promise.resolve({} as Field)
})

export default swrFieldsFetchers
