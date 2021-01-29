import { Button, Grid } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import ThemeModeSwitch from '@_components/ThemeModeSwitch'
import { FutBobLogo } from '@_icons'
import { useConfigStore } from '@_zustand/config'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import Copyright from '../Copyright'
import { schema, onLogin } from './helpers'
import { useSharedStyles, stateSelector } from '../helpers'

const LoginContainer = () => {
  const { openSnackbar, setIsLoading, setIsLogged } = useConfigStore(stateSelector)
  const router = useRouter()
  const classes = useSharedStyles()

  const goToHome = useCallback(() => {
    router.push('/')
  }, [router.push])

  const goToRegister = useCallback(() => {
    router.push('/auth/register')
  }, [router.push])

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: onLogin({ openSnackbar, setIsLoading, setIsLogged, goToHome })
  })

  return (
    <Grid container justify='space-between' alignItems='center' direction='column' className={classes.main}>
      <div className={classes.themeToggleClass}>
        <ThemeModeSwitch />
      </div>
      <FutBobLogo className={classes.logo} />
      <Grid container direction='column' alignItems='center' item xs={12} sm={6} style={{ marginTop: '10vh' }}>
        <FutBobLogo style={{ fontSize: '4em' }} />
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <FormikInput name='email' label='Email' required {...formik} />
          <FormikInput name='password' label='Password' type='password' required {...formik} />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={formik.isSubmitting}
            className={classes.submit}>
               Login
          </Button>
          <Button
            onClick={goToRegister}
            fullWidth
            color='primary'
            disabled={formik.isSubmitting}
            className={classes.submit}>
               Create an account
          </Button>
        </form>
      </Grid>
      <Copyright />
    </Grid>
  )
}

export default LoginContainer
