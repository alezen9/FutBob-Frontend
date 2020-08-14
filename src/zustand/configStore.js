import { FutBobPalette } from '../../palette'
import create from 'zustand'
import { _immer } from './helpers'

export const [useConfigStore, apiConfig] = create(_immer((set, get, api) => ({
  themeType: 'light',
  isLogged: false,
  menuOpen: false,
  isLoading: false,
  pageTitle: 'Dashboard',
  snackbar: {
    open: false,
    variant: 'success',
    message: 'Noice!'
  },
  setPageTitle: title => {
    set(state => {
      state.pageTitle = title
    })
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
