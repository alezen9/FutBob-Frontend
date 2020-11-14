import React, { useEffect, useCallback } from 'react'
import '@_components/Navbar/Navbar.css'
import { FutBobLogo } from '@_icons'
import { useConfigStore } from '@_zustand/configStore'
import { get } from 'lodash'
import { ServerMessage } from '@_utils/serverMessages'
import { apiInstance } from 'src/SDK'
import "nprogress/nprogress.css"
import { ConfigStore } from '@_zustand/helpers'
import { useSWRUser } from '@_swr/User'
import { AS_PATH, LSTheme, LSToken } from '@_utils/LSVariables'
import ZenApp from '@_components/_ZenApp'


const stateSelector = (state: ConfigStore) => ({
  isLoading: state.isLoading,
  openSnackbar: state.openSnackbar,
})

const MyApp = props => {
  const { Component, pageProps } = props
  const { isLoading, openSnackbar } = useConfigStore(stateSelector)

  const { item, trigger } = useSWRUser({ revalidateOnMount: false })
  
  useEffect(() => {
    if(apiInstance.hasToken() && !get(item, '_id', null) && !isLoading) trigger()
  }, [apiInstance.hasToken(), get(item, '_id', null), isLoading])

  const onError = useCallback(
    (error, key, config) => {
      openSnackbar({
        variant: 'error',
        message: ServerMessage[error] || get(error, 'message', error)
      })
    }, [])

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
