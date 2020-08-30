import { FutBobPalette, ThemeType } from '../../palette'
import create from 'zustand'
import { _immer } from './helpers'

export const [useConfigStore, apiConfig] = create(_immer((set: amy, get: any, api: any) => ({
  themeType: ThemeType.light,
  isLogged: false,
  menuOpen: false,
  isLoading: false,
  pageTitle: 'Dashboard',
  snackbar: { open: false },
  setPageTitle: (title: any) => {
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
      state.snackbar = { open: false }
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
  setTheme: (type: ThemeType, onlyType: boolean = false) => {
    set(state => {
      state.themeType = type
    })
    if (!onlyType) {
      window.localStorage.setItem('FutBobTheme', type)
      FutBobPalette.switchTheme(type)
    }
  },
  setIsLoading: bool => {
    set(state => {
      state.isLoading = bool
    })
  }
})))
