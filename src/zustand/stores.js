import create from 'zustand'
import produce from 'immer'
import { apiInstance } from '../SDK'
import cleanDeep from 'clean-deep'
import { FutBobPalette } from '../../palette'

const _immer = config => (set, get, api) => config(fn => set(produce(fn)), get, api)

export const [useConfigStore, apiConfig] = create(_immer((set, get, api) => ({
  themeType: 'light',
  isLogged: false,
  menuOpen: false,
  isLoading: false,
  snackbar: {
    open: false,
    variant: 'success',
    message: 'Noice!'
  },
  openSnackbar: data => {
    set(state => {
      state.snackbar = { ...data, open: true }
    })
  },
  closeSnackbar: () => {
    set(state => {
      state.snackbar = {
        open: false,
        variant: 'success',
        message: 'Noice!' }
    })
  },
  setIsLogged: bool => {
    set(state => {
      state.isLogged = bool
    })
  },
  toggleMenu: () => {
    set(state => {
      state.menuOpen = !state.menuOpen
    })
  },
  setTheme: (type, onlyType = false) => {
    if (['light', 'dark'].includes(type)) {
      set(state => {
        state.themeType = type
      })
      if (!onlyType) {
        window.localStorage.setItem('FutBobTheme', type)
        FutBobPalette.swithTheme(type)
      }
    }
  },
  setIsLoading: bool => {
    set(state => {
      state.isLoading = bool
    })
  }
})))

export const [useUserStore, apiUser] = create(_immer((set, get, api) => ({
  item: {},
  setItem: (item = {}) => set(state => {
    state.item = {
      ...state.item,
      ...cleanDeep(item)
    }
  }),
  reset: () => set({ item: {} }),
  refreshItem: async () => {
    const userFields = `{
      _id,
      name,
      surname,
      dateOfBirth,
      sex,
      futsalPlayer {
        _id,
        positions,
        state
      },
      footballPlayer {
        _id,
        positions,
        state
      },
      avatar,
      username,
      email,
      phone
    }`
    const item = await apiInstance.user_getUserConnected(userFields)
    set(state => {
      state.item = cleanDeep(item)
    })
  }
})))
