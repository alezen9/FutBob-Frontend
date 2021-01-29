import { ThemeType } from '@_palette'
import { useConfigStore } from '@_zustand/config'
import { ConfigStoreSelector } from '@_zustand/config/helpers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiInstance } from 'src/SDK'

type ThemeConfig = {
	lightColor?: string
	darkColor?: string
	LSTheme: string
}

type AuthConfig = {
	AS_PATH: string
	LSToken: string
}

export class ZenMainHooks {
   private stateSelectorTheme: ConfigStoreSelector
   private stateSelectorAuth: ConfigStoreSelector

   constructor(){
      this.stateSelectorTheme = state => ({
         themeType: state.themeType,
         setTheme: state.setTheme
      })
      this.stateSelectorAuth = state => ({
         setIsLogged: state.setIsLogged
      })
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
      const router = useRouter()
      const { setIsLogged } = useConfigStore(this.stateSelectorAuth)

      // useEffect(() => {
      //    if (!isEmpty(cleanQueryParams(router.query))) {
      //       window.localStorage.setItem(AS_PATH, router.asPath)
      //    }
      // }, [router.query])

      useEffect(() => {
         // prefetch main routes
         router.prefetch('/auth/login')
         router.prefetch('/auth/register')
         router.prefetch('/')
         // rehydrate app
         const jssStyles = document.querySelector('#jss-server-side')
         if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
         // check LS token validity
         const checkToken = async (token: string): Promise<void> => {
            try {
               if(!token) throw new Error('no_token')
               const isValid = await apiInstance.auth.isTokenValid(token)
               setIsLogged(isValid)
            } catch (error) {
               setIsLogged(false)
            }
         }
         const token: string = window && window.localStorage 
            ? window.localStorage.getItem(LSToken) 
            : null
         checkToken(token)
         // const path: string = isLogged ? (/\/login/.test(router.pathname) ? '/' : router.pathname || '/') : '/auth/login'
         // const asPath: string | null = isLogged ? window.localStorage.getItem(AS_PATH) : null
         // const origin = asPath ? get(asPath.split('?'), '0', '') : ''
         // const params: string = asPath && origin === router.pathname ? get(asPath.split('?'), '1', '') : ''
         // if (asPath && rawParams.test(router.pathname)) {
         //    router.replace(path, asPath).then(() => setFirstRun(false))
         // } else {
         //    router.replace(`${path}${params ? `?${params}` : ''}`).then(() => setFirstRun(false))
         // }
      }, [LSToken, AS_PATH])

      return {
         isFirstRun
      }
   }
}
