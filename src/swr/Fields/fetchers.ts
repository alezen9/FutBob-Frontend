import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { ListOf } from '@_swr/helpers'
import { Field } from '@_SDK_Field/entities'
import { field_allFields } from '@_SDK_Field/gql_all'

const swrFieldsFetchers = Object.freeze({
  fieldsFetcher: (key: string, filtersKey): Promise<ListOf<Field>> => apiInstance.field.getList(JSON.parse(filtersKey), field_allFields),
  fieldFetcher: (key: string, _id: string | null): Promise<Field> => _id
    ? apiInstance.field.getList({ ..._id && { ids: [_id] } }, field_allFields)
         .then(res => res ? get(res, 'result.0', {}) as Field : {} as Field)
    : Promise.resolve({} as Field)
})

export default swrFieldsFetchers
