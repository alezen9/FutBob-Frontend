import produce from 'immer'
import { ThemeType } from '../../palette'
import { State, StateCreator } from 'zustand'

export const _immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)


export type ConfigStore = {
    themeType: ThemeType
    isLogged: boolean
    menuOpen: boolean
    isLoading: boolean
    pageTitle: any
    snackbar: any
    setPageTitle: (title: any) => void
    openSnackbar: (data: any) => void
    closeSnackbar: VoidFunction
    setIsLogged: (bool: boolean) => void
    toggleMenu: VoidFunction
    setTheme: (type: ThemeType, onlyType?: boolean) => void
    setIsLoading: (isLoading: boolean) => void
}

export type SnackbarData = {
    open: boolean
    variant?: 'error'|'success'|'warning'
    message?: string
}