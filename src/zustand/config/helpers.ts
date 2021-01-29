import { ThemeType } from '@_palette'
import { ZenRoute } from '@_utils/routes/types'
import { setSnackbarData } from '@_zustand/helpers'

export type ConfigStore = {
	themeType: ThemeType
	isLogged: boolean
	menuOpen: boolean
	isLoading: boolean
	pageTitle: any
   snackbar: any
   activeRoute: ZenRoute,
	setPageTitle: (title: any) => void
	openSnackbar: (data: setSnackbarData) => void
	closeSnackbar: VoidFunction
	setIsLogged: (bool: boolean) => void
	toggleMenu: VoidFunction
	setTheme: (type: ThemeType, onlyType?: boolean) => void
	toggleTheme: VoidFunction
	setIsLoading: (isLoading: boolean) => void
}

export type ConfigStoreSelector = (state: ConfigStore) => Partial<ConfigStore>
