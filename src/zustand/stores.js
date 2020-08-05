import create from 'zustand'
import produce from 'immer'

const _immer = config => (set, get, api) => config(fn => set(produce(fn)), get, api)

export const [useUserStore, apiUser] = create(_immer((set, get, api) => ({
  item: {},
  setItem: (item = {}) => set({ item }),
  reset: () => set({ item: {} })
})))
