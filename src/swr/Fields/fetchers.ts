import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { allFieldFields } from 'src/SDK/allFields'
import { ListOf } from '@_swr/helpers'
import { Field } from '@_entities/Fields'

const swrFieldsFetchers = Object.freeze({
  fieldsFetcher: (key: string, filtersKey): Promise<ListOf<Field>> => apiInstance.field_getFields(JSON.parse(filtersKey), allFieldFields),
  fieldFetcher: (key: string, _id: string | null): Promise<Field> => _id
    ? apiInstance.field_getFields({ ..._id && { ids: [_id] } }, allFieldFields)
         .then(res => res ? get(res, 'result.0', {}) as Field : {} as Field)
    : Promise.resolve({} as Field)
})

export default swrFieldsFetchers
