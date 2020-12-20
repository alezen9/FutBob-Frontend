import React, { useCallback, useEffect } from 'react'
import { useConfigStore } from '@_zustand/configStore'
import { get } from 'lodash'
import { ServerMessage } from '@_utils/serverMessages'
import { ConfigStore } from '@_zustand/helpers'
import { AS_PATH, LSTheme, LSToken } from '@_utils/LSVariables'
import ZenApp from '@_components/_ZenApp'
import { AppProps } from 'next/app'
import { useSWRUser } from '@_swr/User'
import { apiInstance } from 'src/SDK'
import { FutBobLogo } from '@_icons'
import { setLocale } from 'yup'
// css
import "nprogress/nprogress.css"
import '@_components/_ZenMenu/MobileMenu/Navbar/Navbar.css'

setLocale({ mixed: { 
   notType: ({ path, type, value, originalValue }) => {
      if(['string', 'number'].includes(type)) return 'Invalid input'
   },
   required: ''
 } })


const stateSelector = (state: ConfigStore) => ({
  isLoading: state.isLoading,
  openSnackbar: state.openSnackbar,
})

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const { isLoading, openSnackbar } = useConfigStore(stateSelector)

  const { item, trigger } = useSWRUser({ revalidateOnMount: false })
  
  useEffect(() => {
    if(apiInstance.auth.hasToken() && !get(item, '_id', null) && !isLoading) trigger()
  }, [apiInstance.auth.hasToken(), get(item, '_id', null), isLoading])

  const onError = useCallback(
    (error, key, config) => {
      openSnackbar({
        variant: 'error',
        message: ServerMessage[error] || get(error, 'message', error)
      })
    }, [openSnackbar])

  return <>
   <ZenApp
      title='FutBob'
      LSVariables={{ AS_PATH, LSTheme, LSToken }}
      swrConfig={{ onError }}
      SplashscreenIcon={<FutBobLogo style={{ fontSize: '6em' }} />}>
         <Component {...pageProps} />
    </ZenApp>
  </>
}

export default React.memo(MyApp)
