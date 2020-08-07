import React from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import FormikInput from '../components/FomrikInput'
import { apiInstance } from '../SDK'
import { FutBobLogo } from '../assets/CustomIcon'
import { useRouter } from 'next/router'
import ThemeSwitch from '../components/ThemeModeSwitch'
import { ServerMessage } from '../utils/serverMessages'
import { useConfigStore } from '../zustand/stores'

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
  const { openSnackbar, setIsLogged, themeType } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading,
    themeType: state.themeType
  }))
  const router = useRouter()

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true)
    try {
      const { token } = await apiInstance.user_login(values, `{ token }`)
      if (token) {
        window.localStorage.setItem('token', token)
        apiInstance.setToken(token)
        setIsLogged(true)
        router.push('/')
      } else throw new Error('Username o password errati')
    } catch (error) {
      openSnackbar({
        variant: 'error',
        message: ServerMessage[error] || 'Username o password errati'
      })
    }
    setSubmitting(false)
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
      <FutBobLogo className={classes.logo} />
      <Grid container direction='column' alignItems='center' item xs={12} sm={6} style={{ marginTop: '10vh' }}>
        <FutBobLogo style={{ fontSize: '4em' }} />
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
