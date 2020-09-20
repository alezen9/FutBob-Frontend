import { FutBobPalette, ThemeType } from '../../palette'
import create, { UseStore } from 'zustand'
import { _immer, ConfigStore } from './helpers'

export const useConfigStore: UseStore<ConfigStore> = create(_immer((set: any, get: any, api: any) => ({
  themeType: ThemeType.light,
  isLogged: false,
  menuOpen: false,
  isLoading: false,
  pageTitle: 'Dashboard',
  snackbar: { open: false },
  setPageTitle: (title: any) => {
    set((state: ConfigStore) => {
      state.pageTitle = title
    })
  },
  openSnackbar: (data: any) => {
    set((state: ConfigStore) => {
      state.snackbar = { ...data, open: true }
    })
  },
  closeSnackbar: () => {
    set((state: ConfigStore) => {
      state.snackbar = { open: false }
    })
  },
  setIsLogged: (bool: boolean) => {
    set((state: ConfigStore) => {
      state.isLogged = bool
    })
  },
  toggleMenu: () => {
    set((state: ConfigStore) => {
      state.menuOpen = !state.menuOpen
    })
  },
  setTheme: (type: ThemeType, onlyType: boolean = false) => {
    set((state: ConfigStore) => {
      state.themeType = type
    })
    if (!onlyType) {
      window.localStorage.setItem('FutBobTheme', type)
      FutBobPalette.switchTheme(type)
    }
  },
  setIsLoading: (bool: boolean) => {
    set((state: ConfigStore) => {
      state.isLoading = bool
    })
  }
})))
