import React, { useCallback, useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import FormikInput from '@_components/FormikInput'
import ThemeModeSwitch from '@_components/ThemeModeSwitch'
import { FutBobLogo } from '@_icons'
import { useConfigStore } from '@_zustand/config'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Copyright from '../Copyright'
import { schemaFinalizeAccount, onFinalizeAccount, onResendCode } from './helpers'
import { useSharedStyles, stateSelector } from '../helpers'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import SuccessAnimationCheck from '@_components/SuccessAnimationCheck'

const FinalizeAccountContainer = () => {
  const { openSnackbar, setIsLoading, setIsLogged } = useConfigStore(stateSelector)
  const router = useRouter()
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  const goToHome = useCallback(() => {
    router.push(routesPaths[ZenRouteID.DASHBOARD].path)
  }, [router.push])

  const formik = useFormik({
    initialValues: {
      unverifiedCode: router.query.code
    },
    enableReinitialize: true,
    validationSchema: schemaFinalizeAccount,
    onSubmit: onFinalizeAccount({ openSnackbar, setIsLoading, goToHome, setIsLogged })
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
        <AnimatePresence exitBeforeEnter>
          {emailSent
            ? <SuccessAnimationCheck
              message='An email has been sent to you, please take appropriate action.'
              key='success-resend-account' />
            : <motion.div
              key='form-finalize'
              style={{ width: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <FormikInput
                  name='password'
                  label='Password'
                  type='password'
                  required
                  {...formik} />
                <FormikInput
                  name='confirmPassword'
                  label='Confirm password'
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
                 Sign up
                </Button>
                <Button
                  fullWidth
                  variant='outlined'
                  color='primary'
                  onClick={onResendCode({ code: router.query.code, setIsLoading, setEmailSent, openSnackbar })}
                  disabled={formik.isSubmitting}
                  className={classes.submit}>
                     Send new link
                </Button>
              </form>
            </motion.div>}
        </AnimatePresence>
        <Grid container justify='center' style={{ margin: '2em auto' }} item xs={12}>
          <Link passHref href={routesPaths[ZenRouteID.LOGIN].path} className={classes.link}>
            Back to login
          </Link>
        </Grid>
      </Grid>
      <Copyright />
    </Grid>
  )
}

export default FinalizeAccountContainer
