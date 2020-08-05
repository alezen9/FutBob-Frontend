import React, { useContext } from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import { GlobalContextProvider } from './_app'
import FormikInput from '../components/FomrikInput'
import { apiInstance } from '../SDK'
import { CondexoLogo } from '../assets/CustomIcon'
import { useRouter } from 'next/router'
import AnimatedCondexoLogo from '../assets/AnimatedCondexoLogo'
import ThemeSwitch from '../components/ThemeModeSwitch'
import { get } from 'lodash'

const Copyright = props => {
  return (
    <Grid container item xs={12} justify='center'>
      <Typography variant='caption' align='center'>
        {`Copyright © FutBob ${new Date().getFullYear()}`}
      </Typography>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  main: {
    position: 'fixed',
    width: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: `${theme.spacing(5)}px 0`
  },
  form: {
    width: '100%',
    maxWidth: 300,
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  logo: {
    position: 'absolute',
    bottom: '-40vh',
    left: '-10vw',
    fontSize: '50em',
    transform: 'rotateZ(-30deg)',
    opacity: '.05',
    color: '#005959',
    [theme.breakpoints.down('xs')]: {
      bottom: '-50vh',
      fontSize: '45em'
    }
  },
  themeToggleClass: {
    position: 'absolute',
    top: '1.5em',
    right: '1.5em'
  }
}))

const SignIn = props => {
  const classes = useStyles()
  const { openSnackbar, setIsLogged, themeType } = useContext(GlobalContextProvider)
  const router = useRouter()

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true)
      const { token } = await apiInstance.user_login(values, `{ token }`)
      if (token) {
        window.localStorage.setItem('token', token)
        apiInstance.setToken(token)
        setIsLogged(true)
        router.push('/')
      } else throw new Error('Username o password errati')
    } catch (error) {
      setSubmitting(false)
      openSnackbar({
        variant: 'error',
        message: get(error, 'message', null) || 'Username o password errati'
      })
    }
  }

  const formik = useFormik({
    initialValues: {},
    onSubmit
  })

  return (
    <Grid container justify='space-between' alignItems='center' direction='column' className={classes.main}>
      <div className={classes.themeToggleClass}>
        <ThemeSwitch />
      </div>
      {/* <CondexoLogo className={classes.logo} /> */}
      <Grid container direction='column' alignItems='center' item xs={12} sm={6} style={{ marginTop: '10vh' }}>
        {/* <AnimatedCondexoLogo themeType={themeType} style={{ height: 80 }} svgStyle={{ width: 'auto', height: '100%' }} /> */}
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <FormikInput
            name='username'
            label='Username'
            required
            {...formik}
          />
          <FormikInput
            name='password'
            label='Password'
            type='password'
            required
            {...formik}
          />
          <Button
            type='submit'
            fullWidth
            variant={themeType === 'light' ? 'contained' : 'outlined'}
            color='primary'
            disabled={formik.isSubmitting}
            className={classes.submit}>
              Sign In
          </Button>
        </form>
      </Grid>
      <Copyright />
    </Grid>
  )
}

export default SignIn
