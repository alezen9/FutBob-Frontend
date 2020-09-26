import React, { useState, useEffect, useCallback } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, Snackbar, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Offline, Online } from 'react-detect-offline'
import OfflinePage from '@_components/Offline'
import Head from 'next/head'
import Menu from '@_components/Menu'
import Router, { useRouter } from 'next/router'
import Title from '@_components/Title'
import ProgressBar from '@_components/ProgressBar'
import lightTheme from 'lightTheme'
import darkTheme from 'darkTheme'
import Navbar from '../components/Navbar'
import BottomNavbar from '@_components/BottomNav'
// css
import '../components/Navbar/Navbar.css'
import { FutBobLogo } from '@_icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useConfigStore } from '@_zustand/configStore'
import { isEmpty, get } from 'lodash'
import { cleanQueryParams } from '@_utils/helpers'
import { SWRConfig } from 'swr'
import { ServerMessage } from '@_utils/serverMessages'
import { useSWRUser } from '@_swr/hooks'
import { ThemeType } from '@_palette'
import { apiInstance } from 'src/SDK'
import "nprogress/nprogress.css";
import dynamic from 'next/dynamic'
import { ConfigStore } from '@_zustand/helpers'
const NProgress = dynamic(() => import("@_components/NProgress"), { ssr: false })

const AS_PATH = 'FutBobLastPath' // eslint-disable-line

const rawParams = /\/+\[+[a-zA-Z0-9]+\]+\/?/gmi

const useStyles = makeStyles(theme => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 85
    }
  },
  rootAlert: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 12,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  alertMessage: {
    padding: 0,
    fontSize: '11pt',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  content: {
    width: (props: any) => !props.isLogged ? '100vw' : `calc(100vw - ${props.menuOpen ? 250 : 60}px)`,
    transition: 'width .2s ease',
    overflow: 'hidden auto',
    minHeight: '100vh',
    padding: '1.5em',
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      marginTop: '5em',
      width: '100vw !important',
      padding: '1em 1em 90px 1em'
    }
  },
  wrapper: {
    display: 'flex',
    width: '100vw',
    minHeight: '100vh',
    overflow: 'hidden auto'
  }
}))

const Alert = props => {
  const { rootAlert, alertMessage } = useStyles()
  return <MuiAlert
    classes={{
      root: rootAlert,
      message: alertMessage
    }}
    elevation={6}
    variant='filled'
    {...props}
  />
}

const stateSelector = (state: ConfigStore) => ({
  themeType: state.themeType,
  isLogged: state.isLogged,
  menuOpen: state.menuOpen,
  isLoading: state.isLoading,
  snackbar: state.snackbar,
  closeSnackbar: state.closeSnackbar,
  setTheme: state.setTheme,
  setIsLogged: state.setIsLogged,
  openSnackbar: state.openSnackbar,
})

const SplashScreen = React.memo(() => {
  return <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}
    >
      <FutBobLogo style={{ fontSize: '6em' }} />
    </motion.div>
  </AnimatePresence>
})

const MyApp = props => {
  const { Component, pageProps } = props
  const {
    themeType,
    isLogged,
    menuOpen,
    isLoading,
    snackbar,
    closeSnackbar,
    setTheme,
    setIsLogged,
    openSnackbar
  } = useConfigStore(stateSelector)

  const { item, trigger } = useSWRUser({ revalidateOnMount: false })
  
  useEffect(() => {
    if(apiInstance.hasToken() && !get(item, '_id', null) && !isLoading) trigger()
  }, [apiInstance.hasToken(), get(item, '_id', null), isLoading])

  const router = useRouter()

  const [isFirstRun, setFirstRun] = useState(true)

  const classes = useStyles({ menuOpen, isLogged })
  const _theme = useTheme()
  const isSmallScreen = useMediaQuery(_theme.breakpoints.down('sm'))

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return
    closeSnackbar()
  }

  const onError = useCallback(
    (error, key, config) => {
      openSnackbar({
        variant: 'error',
        message: ServerMessage[error] || get(error, 'message', error)
      })
    }, [])

  useEffect(() => {
    if (!isEmpty(cleanQueryParams(router.query))) {
      window.localStorage.setItem(AS_PATH, router.asPath)
    }
  }, [router.query])

  useEffect(() => {
    router.prefetch('/login')
    router.prefetch('/')
    router.prefetch('/profile')
    router.prefetch('/players')
    router.prefetch('/matches')
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
    const isLogged: any = window && window.localStorage
      ? window.localStorage.getItem('FutBobToken')
      : false
    const _themeType: ThemeType = window && window.localStorage
      ? window.localStorage.getItem('FutBobTheme') as ThemeType
      : ThemeType.light
    setIsLogged(!!isLogged)
    setTheme(_themeType)
    const path: string = isLogged
      ? /\/login/.test(router.pathname)
        ? '/'
        : router.pathname || '/'
      : '/login'
    const asPath: string|null = isLogged ? window.localStorage.getItem(AS_PATH) : null
    if (asPath && rawParams.test(router.pathname)) {
      router.replace(path, asPath)
        .then(() => setFirstRun(false))
    } else {
      router.replace(path)
        .then(() => setFirstRun(false))
    }
  }, [])

  useEffect(() => {
    if (process.browser) {
      if (!document.body.style.transition) {
        document.body.style.transition = 'background-color .1s ease'
      }
      document.body.style.backgroundColor = themeType === 'light' ? '#fafafa' : '#111'
    }
  }, [themeType])

  return <>
    <Head>
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <title>FutBob</title>
    </Head>
    <ThemeProvider theme={themeType === 'light' ? lightTheme : darkTheme}>
      <Online>
        <CssBaseline />
        {isFirstRun
          ? <SplashScreen />
          : <div className={classes.wrapper}>
            {/* {isLoading && !isSmallScreen && <ProgressBar />} */}
            <NProgress />
            {isLogged && <>{isSmallScreen ? <Navbar isLoading={isLoading} /> : <Menu />}</>}
            <div {...isLogged && { className: classes.content }}>
              {isLogged && <Title />}
              <SWRConfig value={{ onError }} >
                <Component {...pageProps} />
              </SWRConfig>
            </div>
          </div>}
        <Snackbar
          className={classes.snackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={handleClose}
          autoHideDuration={3000}
          open={snackbar.open}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.variant}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Online>
      <Offline>
        <OfflinePage />
      </Offline>
    </ThemeProvider>
  </>
}

export default React.memo(MyApp)
