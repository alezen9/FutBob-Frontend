import React, { createContext, useState, useEffect, useCallback, useReducer } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, Snackbar, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Offline, Online } from 'react-detect-offline'
import OfflinePage from '../components/Offline'
import Head from 'next/head'
import Menu from '../components/Menu'
import Router, { useRouter } from 'next/router'
import Title from '../components/Title'
import { getTitleFromPathname } from '../utils/helpers'
import ProgressBar from '../components/ProgressBar'
import lightTheme from '../../lightTheme'
import darkTheme from '../../darkTheme'
import AnimatedCondexoLogo from '../assets/AnimatedCondexoLogo'
import ExportsReducer from '../utils/reducers/exports'
import Navbar from '../components/Navbar'
// css
import '../components/Navbar/Navbar.css'

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
    width: ({ menuOpen, isLogged }) => !isLogged ? '100vw' : `calc(100vw - ${menuOpen ? 250 : 60}px)`,
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

export const GlobalContextProvider = createContext()

const MyApp = props => {
  const { Component, pageProps } = props
  const router = useRouter()
  const [snackbar, setSnackbar] = useState({
    open: false,
    variant: 'success',
    message: 'Tutto bene'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [isFirstRun, setFirstRun] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [themeType, setThemeType] = useState('light')
  const [exports, dispatchExport] = useReducer(ExportsReducer, {})

  const classes = useStyles({ menuOpen, isLogged })
  const _theme = useTheme()
  const isSmallScreen = useMediaQuery(_theme.breakpoints.down('sm'))

  const toggleMenu = () => setMenuOpen(state => !state)

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return
    setSnackbar(state => ({ ...state, open: false }))
  }

  useEffect(() => {
    router.prefetch('/login')
    router.prefetch('/')
    router.prefetch('/players')
    router.prefetch('/matches')
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    const isLogged = window && window.localStorage
      ? window.localStorage.getItem('token')
      : false
    const themeType = window && window.localStorage
      ? window.localStorage.getItem('FutBobTheme')
      : 'light'
    setIsLogged(!!isLogged)
    setThemeType(themeType || 'light')
    window.localStorage.setItem('FutBobTheme', themeType || 'light')
    const path = isLogged ? router.pathname || '/' : '/login'
    router.push(path)
      .then(() => setFirstRun(false))
  }, [])

  useEffect(() => {
    const handleRouteChangeStart = url => {
      setIsLoading(true)
    }
    const handleRouteChangeEnd = url => {
      setIsLoading(false)
    }
    if (isLogged) {
      Router.events.on('routeChangeStart', handleRouteChangeStart)
      Router.events.on('routeChangeComplete', handleRouteChangeEnd)
    } else {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeEnd)
    }
  }, [isLogged])

  useEffect(() => {
    if (process.browser) {
      if (!document.body.style.transition) {
        document.body.style.transition = 'background-color .3s ease'
      }
      document.body.style.backgroundColor = themeType === 'light' ? '#fafafa' : '#111'
    }
  }, [themeType])

  const setTheme = useCallback(
    type => {
      if (['light', 'dark'].includes(type)) {
        setThemeType(type)
        window.localStorage.setItem('FutBobTheme', type)
      }
    }, [])

  const openSnackbar = useCallback(data => setSnackbar({ ...data, open: true }), [])

  return <>
    <Head>
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <title>FutBob</title>
    </Head>
    <ThemeProvider theme={themeType === 'light' ? lightTheme : darkTheme}>
      <Online>
        <GlobalContextProvider.Provider
          value={{
            openSnackbar,
            setIsLogged,
            toggleMenu,
            menuOpen,
            setTheme,
            themeType,
            setIsLoading,
            exports,
            dispatchExport
          }}>
          <CssBaseline />
          {isFirstRun
            ? <AnimatedCondexoLogo />
            : <div className={classes.wrapper}>
              {isLogged && isLoading && !isSmallScreen && <ProgressBar />}
              {isLogged && <>{isSmallScreen ? <Navbar isLoading={isLoading} /> : <Menu />}</>}
              <div {...isLogged && { className: classes.content }}>
                {isLogged && <Title>{getTitleFromPathname(router.pathname)}</Title>}
                <Component {...pageProps} />
              </div>
            </div>}
        </GlobalContextProvider.Provider>
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
