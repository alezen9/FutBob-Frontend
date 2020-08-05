import { get } from 'lodash'

export const ExportsReducerType = Object.freeze({
  Add: 'addExport',
  Remove: 'removeExport'
})

const ExportsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ExportsReducerType.Add:
      const { section, data } = payload
      return {
        ...state,
        [section]: [
          ...get(state, section, []),
          data
        ]
      }
    case ExportsReducerType.Remove:
      return state
    default:
      return state
  }
}

export default ExportsReducer
