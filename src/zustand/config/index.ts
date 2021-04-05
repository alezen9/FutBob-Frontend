import { ZenPalette, ThemeType } from '@_MUITheme'
import create, { UseStore } from 'zustand'
import { ConfigStore, MapLayer, PrevRoute } from './helpers'
import { LSTheme } from '@_utils/LSVariables'
import { routesPaths } from '@_utils/routes'
import { setSnackbarData, _immer } from '@_zustand/helpers'
import { ZenRouteID, ZenRoute } from '@_utils/routes/types'

export const useConfigStore: UseStore<ConfigStore> = create(
	_immer((set: any, get: any, api: any) => ({
		themeType: ThemeType.light,
		isLogged: false,
		menuOpen: false,
		isLoading: false,
		pageTitle: 'Dashboard',
      snackbar: { open: false },
      activeRoute: {} as ZenRoute,
      prevRoute: {} as PrevRoute,
      activeMapLayer: MapLayer.Satellite,
      setActiveMapLayer: (layer: MapLayer) => {
         set((state: ConfigStore) => {
            state.activeMapLayer = layer
         })
      },
      setActiveRoute: (routeID: ZenRouteID) => {
         set((state: ConfigStore) => {
            state.prevRoute = {
               ...state.activeRoute,
               exactURL: window.location.href
            }
				state.activeRoute = routesPaths[routeID]
            state.pageTitle = routesPaths[routeID].title
			})
      },
		setPageTitle: (title: any) => {
			set((state: ConfigStore) => {
				state.pageTitle = title
			})
		},
		openSnackbar: (data: setSnackbarData) => {
			set((state: ConfigStore) => {
				state.snackbar = { ...data, open: true }
			})
		},
		closeSnackbar: () => {
			set((state: ConfigStore) => {
				state.snackbar = {
					open: false,
					message: state.snackbar.message || '',
					variant: state.snackbar.variant || ''
				}
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
				window.localStorage.setItem(LSTheme, type)
				ZenPalette.switchTheme(type)
			}
		},
		toggleTheme: () => {
			const newType = get().themeType === ThemeType.dark ? ThemeType.light : ThemeType.dark
			set((state: ConfigStore) => {
				state.themeType = newType
			})
			window.localStorage.setItem(LSTheme, newType)
			ZenPalette.switchTheme(newType)
		},
		setIsLoading: (bool: boolean) => {
			set((state: ConfigStore) => {
				state.isLoading = bool
			})
		}
	}))
)
