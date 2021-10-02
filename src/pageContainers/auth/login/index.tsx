import React, { useCallback, useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import FormikInput from '@_components/FormikInput'
import ThemeModeSwitch from '@_components/ThemeModeSwitch'
import { FutBobLogo } from '@_icons'
import { useConfigStore } from '@_zustand/config'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Copyright from '../Copyright'
import { schema, onLogin } from './helpers'
import { useSharedStyles, stateSelector } from '../helpers'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import Link from 'next/link'

const LoginContainer = () => {
   const { openSnackbar, setIsLoading, setIsLogged } = useConfigStore(stateSelector)
   const router = useRouter()

   useEffect(() => {
      setIsLoading(false)
   }, [setIsLoading])

   const goToHome = useCallback(() => {
      router.push(routesPaths[ZenRouteID.DASHBOARD].path)
   }, [router.push])

   const formik = useFormik({
      initialValues: {},
      validationSchema: schema,
      onSubmit: onLogin({ openSnackbar, setIsLoading, setIsLogged, goToHome })
   })

   const classes = useSharedStyles({ isSubmitting: formik.isSubmitting })

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
               <FormikInput
                  name='password'
                  label='Password'
                  type='password'
                  required
                  {...formik} />
               <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={formik.isSubmitting}
                  className={classes.submit}>
                  Login
               </Button>
               <Grid container justify='center' style={{ marginTop: '2em' }} item xs={12}>
                  <Link passHref href={routesPaths[ZenRouteID.REQUEST_RESET_PASSWORD].path}>
                     <a className={classes.link}>Forgot password?</a>
                  </Link>
               </Grid>
               <Grid container justify='center' style={{ marginTop: '2em' }} item xs={12}>
                  <Link passHref href={routesPaths[ZenRouteID.REQUEST_ACCOUNT].path}>
                     <a className={classes.link}>Create an account</a>
                  </Link>
               </Grid>
            </form>
         </Grid>
         <Copyright />
      </Grid>
   )
}

export default LoginContainer
