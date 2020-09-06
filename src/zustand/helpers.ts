import produce from 'immer'
import { ThemeType } from '../../palette'

export const _immer = config=> (set, get, api) => config(fn => set(produce(fn)), get, api)


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