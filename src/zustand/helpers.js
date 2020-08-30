import produce from 'immer'

export const _immer = config => (set, get, api) => config(fn => set(produce(fn)), get, api)
