import { ThemeType } from '@_palette'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { useConfigStore } from '@_zustand/config'
import { ConfigStoreSelector } from '@_zustand/config/helpers'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { apiInstance } from 'src/SDK'
import { zenHooksInstance } from '.'

type ThemeConfig = {
	lightColor?: string
	darkColor?: string
	LSTheme: string
}

type AuthConfig = {
	AS_PATH: string
	LSToken: string
}

type ZenRouteAuthIDS = ZenRouteID.DASHBOARD|ZenRouteID.LOGIN|ZenRouteID.REQUEST_ACCOUNT
const ZenRouteAuthIDSArr: ZenRouteID[] = [ZenRouteID.DASHBOARD,ZenRouteID.LOGIN,ZenRouteID.REQUEST_ACCOUNT]

export class ZenMainHooks {
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
      // see if user is on public route
      const isAuthPath: boolean = !!/\/auth\/(login|account\/request)/.test(path)
      // every public route
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
      const { lightColor = '#fafafa', darkColor = '#111', LSTheme } = config
      const { themeType, setTheme } = useConfigStore(this.stateSelectorTheme)

      useEffect(() => {
         const _themeType: ThemeType =
            window && window.localStorage && window.localStorage.getItem(LSTheme)
               ? (window.localStorage.getItem(LSTheme) as ThemeType)
               : ThemeType.light
         setTheme(_themeType)
      }, [setTheme, LSTheme])

      useEffect(() => {
         if (process.browser) {
            if (!document.body.style.transition) {
               document.body.style.transition = 'background-color .1s ease'
            }
            document.body.style.backgroundColor = themeType === ThemeType.light 
               ? lightColor 
               : darkColor
         }
      }, [themeType, lightColor, darkColor])
   }

   useInitWithAuthentication = (config: AuthConfig) => {
      const { AS_PATH, LSToken } = config
      const [isFirstRun, setFirstRun] = useState(true)
      const [isCheckingToken, setIsCheckingToken] = useState(true)
      const router = useRouter()
      const { setIsLogged, isLogged, activeRoute } = useConfigStore(this.stateSelectorAuth)
      const isMounted = zenHooksInstance.useIsMounted()
      const isTokenValid = useRef(false)

      useEffect(() => {
         if(!isCheckingToken && isFirstRun) setFirstRun(false)
      }, [isCheckingToken, isFirstRun])

      // make auth routes not accessible if user is logged in
      useEffect(() => {
         if(!isCheckingToken && isLogged && ZenRouteAuthIDSArr.includes(activeRoute._id)) {
            router.replace(this.paths.DASHBOARD)
               .then(() => isMounted.current && setIsCheckingToken(false))
               .catch(() => isMounted.current && setIsCheckingToken(false))
         }
      }, [activeRoute._id, isLogged, isCheckingToken])

      // useEffect(() => {
      //    if (!isEmpty(cleanQueryParams(router.query))) {
      //       window.localStorage.setItem(AS_PATH, router.asPath)
      //    }
      // }, [router.query])

      const redirectUser = useCallback(
         (isAuthPath: boolean, isPublicPath: boolean): void => {
            if(!isTokenValid.current && !isPublicPath) {
               router.replace(this.paths.LOGIN)
                  .then(() => isMounted.current && setIsCheckingToken(false))
                  .catch(() => isMounted.current && setIsCheckingToken(false))
            } else if(isTokenValid.current && isAuthPath) {
               router.replace(this.paths.DASHBOARD)
                  .then(() => isMounted.current && setIsCheckingToken(false))
                  .catch(() => isMounted.current && setIsCheckingToken(false))
            } else {
               isMounted.current && setIsCheckingToken(false)
            }
         }, [router.replace])

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
         // const path: string = isLogged ? (/\/login/.test(router.pathname) ? '/' : router.pathname || '/') : '/auth/login'
         // const asPath: string | null = isLogged ? window.localStorage.getItem(AS_PATH) : null
         // const origin = asPath ? get(asPath.split('?'), '0', '') : ''
         // const params: string = asPath && origin === router.pathname ? get(asPath.split('?'), '1', '') : ''
         // if (asPath && rawParams.test(router.pathname)) {
         //    router.replace(path, asPath).then(() => setFirstRun(false))
         // } else {
         //    router.replace(`${path}${params ? `?${params}` : ''}`).then(() => setFirstRun(false))
         // }
      }, [LSToken, AS_PATH, redirectUser])

      return {
         isFirstRun,
         isTokenValid
      }
   }
}
