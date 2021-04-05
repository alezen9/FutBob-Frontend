import { ThemeType } from '@_MUITheme'
import { ZenRoute, ZenRouteID } from '@_utils/routes/types'
import { setSnackbarData } from '@_zustand/helpers'

export type PrevRoute = ZenRoute & {
   exactURL: string
}

export enum MapLayer {
   Normal = 'Normal',
   Satellite = 'Satellite',
   Light = 'Light',
   Dark = 'Dark'
}

export type ConfigStore = {
	themeType: ThemeType
   toggleTheme: VoidFunction
   setTheme: (type: ThemeType, onlyType?: boolean) => void

	isLogged: boolean
   setIsLogged: (bool: boolean) => void

	menuOpen: boolean
   toggleMenu: VoidFunction

	isLoading: boolean
   setIsLoading: (isLoading: boolean) => void

	pageTitle: any
   setPageTitle: (title: any) => void

   snackbar: any
   openSnackbar: (data: setSnackbarData) => void
	closeSnackbar: VoidFunction

   activeRoute: ZenRoute
   prevRoute: PrevRoute,
   setActiveRoute: (routeID: ZenRouteID) => void

   activeMapLayer: MapLayer
   setActiveMapLayer: (layer: MapLayer) => void
}

export type ConfigStoreSelector = (state: ConfigStore) => Partial<ConfigStore>
