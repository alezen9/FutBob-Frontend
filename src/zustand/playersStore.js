import create from 'zustand'
import { apiInstance } from '../SDK'
import cleanDeep from 'clean-deep'
import { _immer, playerFields } from './helpers'
import { get as lodashGet } from 'lodash'

export const [usePlayerStore, apiPlayer] = create(_immer((set, get, api) => ({
  list: [],
  item: {},
  setItem: (fields = {}) => {
    set(state => {
      state.item = {
        ...state.item,
        ...cleanDeep(fields)
      }
    })
  },
  resetItem: () => {
    set(state => {
      state.item = {}
    })
  },
  resetList: () => {
    set(state => {
      state.list = []
    })
  },
  getItem: async _id => {
    const items = await apiInstance.player_getPlayers({ ids: [_id] }, playerFields)
    set(state => {
      state.item = cleanDeep(lodashGet(items, '0', {}))
    })
  },
  getData: async (filters = {}) => {
    const list = await apiInstance.player_getPlayers(filters, playerFields)
    set(state => {
      state.list = cleanDeep(list)
    })
  }
})))
