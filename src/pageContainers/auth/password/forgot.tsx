import React, { useCallback, useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import ThemeModeSwitch from '@_components/ThemeModeSwitch'
import { FutBobLogo } from '@_icons'
import { useConfigStore } from '@_zustand/config'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Copyright from '../Copyright'
import { schemaRequestReset, onForgotPassword } from './helpers'
import { useSharedStyles, stateSelector } from '../helpers'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'

const ForgotPasswordContainter = () => {
  const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
  const router = useRouter()
  const classes = useSharedStyles()
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  const goToLogin = useCallback(() => {
    router.push(routesPaths[ZenRouteID.LOGIN].path)
  }, [router.push])

  const formik = useFormik({
    initialValues: {},
    validationSchema: schemaRequestReset,
    onSubmit: onForgotPassword({ openSnackbar, setIsLoading, setEmailSent })
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
          <FormikInput
            name='email'
            label='Email'
            required
            {...formik} />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={formik.isSubmitting}
            className={classes.submit}>
               Proceed
          </Button>
          <Button
            onClick={goToLogin}
            fullWidth
            color='primary'
            disabled={formik.isSubmitting}
            className={classes.submit}>
               Back to Login
          </Button>
        </form>
      </Grid>
      <Copyright />
    </Grid>
  )
}

export default ForgotPasswordContainter
