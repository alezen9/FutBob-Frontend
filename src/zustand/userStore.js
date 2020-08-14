import create from 'zustand'
import { apiInstance } from '../SDK'
import cleanDeep from 'clean-deep'
import { _immer, userFields } from './helpers'

export const [useUserStore, apiUser] = create(_immer((set, get, api) => ({
  item: {},
  setItem: (fields = {}) => {
    set(state => {
      state.item = {
        ...state.item,
        ...cleanDeep(fields)
      }
    })
  },
  reset: () => {
    set(state => {
      state.item = {}
    })
  },
  getData: async () => {
    const item = await apiInstance.user_getUserConnected(userFields)
    set(state => {
      state.item = cleanDeep(item)
    })
  }
})))
