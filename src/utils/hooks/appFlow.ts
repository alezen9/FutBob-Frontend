import { INITIAL_THEME_TYPE, ThemeType } from '@_MUITheme'
import { routesPaths } from '@_utils/routes'
import { publicRoutes } from '@_utils/routes/Public'
import { ZenRouteID } from '@_utils/routes/types'
import { useConfigStore } from '@_zustand/config'
import { ConfigStoreSelector } from '@_zustand/config/helpers'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { apiInstance } from 'src/SDK'
import zenHooks from '.'

type ThemeConfig = {
   bodyBgColor?: {
      [ThemeType.light]?: string
      [ThemeType.dark]?: string
   }
	LSTheme: string
}

type AuthConfig = {
	LSToken: string
}

type ZenRouteAuthIDS = ZenRouteID.DASHBOARD|ZenRouteID.LOGIN|ZenRouteID.REQUEST_ACCOUNT
const publicRoutesIDS: ZenRouteID[] = publicRoutes.map(({ _id }) => _id)

export class ZenAppFlowHooks {
   private stateSelectorTheme: ConfigStoreSelector
   private stateSelectorAuth: ConfigStoreSelector
   private stateSelectorSetActiveRoute: ConfigStoreSelector
   private paths: Partial<Record<ZenRouteAuthIDS, string>>

   constructor(){
      this.stateSelectorTheme = state => ({
         themeType: state.themeType,
         setTheme: state.setTheme
      })
      this.stateSelectorAuth = state => ({
         setIsLogged: state.setIsLogged,
         isLogged: state.isLogged,
         activeRoute: state.activeRoute
      })
      this.stateSelectorSetActiveRoute = state => ({
         setActiveRoute: state.setActiveRoute
      })
      this.paths = {
         [ZenRouteID.DASHBOARD]: routesPaths[ZenRouteID.DASHBOARD].path,
         [ZenRouteID.LOGIN]: routesPaths[ZenRouteID.LOGIN].path,
         [ZenRouteID.REQUEST_ACCOUNT]: routesPaths[ZenRouteID.REQUEST_ACCOUNT].path
      }
   }

   private checkPathType (path: string): { isAuthPath: boolean, isPublicPath: boolean } {
      // see if user is on public route (do not touch anymore)
      const isAuthPath: boolean = !!/\/auth\/(login|account\/request)/.test(path)
      // every public route (edit only this one)
      const isPublicPath: boolean = !!/(\/auth\/(login|account\/request|account\/finalize|password\/forgot|password\/reset))/.test(path)
      return { isAuthPath, isPublicPath }
   }

   useSetActivePage = (routeID: ZenRouteID) => {
      const { setActiveRoute } = useConfigStore(this.stateSelectorSetActiveRoute)
   
      useEffect(() => {
         setActiveRoute(routeID)
      }, [setActiveRoute, routeID])
   }

   useIsPrivateRoute = (): boolean => {
      const [isPrivate, setIsPrivate] = useState(false)
      const activeRoute = useConfigStore(state => state.activeRoute)
      
      useEffect(() => {
         setIsPrivate(!!activeRoute.isPrivate)
      }, [activeRoute.isPrivate])

      return isPrivate
   }

   useWithThemeSwitch = (config: ThemeConfig) => {
      const { bodyBgColor, LSTheme } = config
      const { themeType, setTheme } = useConfigStore(this.stateSelectorTheme)

      useEffect(() => {
         const _themeType: ThemeType =
            window && window.localStorage && window.localStorage.getItem(LSTheme)
               ? (window.localStorage.getItem(LSTheme) as ThemeType)
               : INITIAL_THEME_TYPE
         setTheme(_themeType)
      }, [setTheme, LSTheme])

      useEffect(() => {
         if (process.browser) {
            if (!document.body.style.transition) {
               document.body.style.transition = 'background-color .1s ease'
            }
            document.body.style.backgroundColor = themeType === ThemeType.light 
               ? get(bodyBgColor, ThemeType.light, '#fafafa')
               : get(bodyBgColor, ThemeType.light, '#111')
         }
      }, [themeType, JSON.stringify(bodyBgColor || {})])
   }

   useInitWithAuthentication = (config: AuthConfig) => {
      const { LSToken } = config
      const [isFirstRun, setFirstRun] = useState(true)
      const [isCheckingToken, setIsCheckingToken] = useState(true)
      const router = useRouter()
      const { setIsLogged, isLogged, activeRoute } = useConfigStore(this.stateSelectorAuth)
      const isMounted = zenHooks.utils.useIsMounted()
      const isTokenValid = useRef(false)

      useEffect(() => {
         if(!isCheckingToken && isFirstRun) setFirstRun(false)
      }, [isCheckingToken, isFirstRun])

      // make public routes not accessible if user is logged in
      useEffect(() => {
         if(!isCheckingToken && isLogged && publicRoutesIDS.includes(activeRoute._id) && activeRoute._id !== ZenRouteID.ERROR) {
            router.replace(this.paths.DASHBOARD)
               .then(() => isMounted.current && setIsCheckingToken(false))
               .catch(() => isMounted.current && setIsCheckingToken(false))
         }
      }, [activeRoute._id, isLogged, isCheckingToken])

      const redirectUser = useCallback(
         (isAuthPath: boolean, isPublicPath: boolean): void => {
            // 1. good token && public => redirect to home
            // 2. bad token && private => redirect login
            // 3. bad token && public => ok
            // 4. good token and private => ok
            if(!isTokenValid.current && !isPublicPath) { /** 2 */
               router.replace(this.paths.LOGIN)
                  .then(() => isMounted.current && setIsCheckingToken(false))
                  .catch(() => isMounted.current && setIsCheckingToken(false))
            } else if(isTokenValid.current && isPublicPath) { /** 1 */
               router.replace(this.paths.DASHBOARD)
                  .then(() => isMounted.current && setIsCheckingToken(false))
                  .catch(() => isMounted.current && setIsCheckingToken(false))
            } else { /** 3 & 4 */
               isMounted.current && setIsCheckingToken(false)
            }
         }, [])

      // on mount
      useEffect(() => {
         // prefetch main routes
         router.prefetch(this.paths.LOGIN)
         router.prefetch(this.paths.REQUEST_ACCOUNT)
         router.prefetch(this.paths.DASHBOARD)
         // rehydrate app
         const jssStyles = document.querySelector('#jss-server-side')
         if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
         // check path type
         const { isAuthPath, isPublicPath } = this.checkPathType(router.pathname)
         // get and check LS token validity
         const token: string = window && window.localStorage 
            ? window.localStorage.getItem(LSToken) 
            : null
         if(!token) {
            isTokenValid.current = false
            setIsLogged(false)
            redirectUser(isAuthPath, isPublicPath)
         } else {
            apiInstance.auth.isTokenValid(token)
               .then(isValid => {
                  if(isMounted.current){
                     isTokenValid.current = isValid
                     setIsLogged(isValid)
                     redirectUser(isAuthPath, isPublicPath)
                  }
               })
               .catch(() => {
                  if(isMounted.current){
                     isTokenValid.current = false
                     setIsLogged(false)
                     redirectUser(isAuthPath, isPublicPath)
                  }
               })
         }
      }, [LSToken])

      return {
         isFirstRun,
         isTokenValid
      }
   }
}
