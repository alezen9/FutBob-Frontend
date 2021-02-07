import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import ThemeModeSwitch from '@_components/ThemeModeSwitch'
import { FutBobLogo } from '@_icons'
import { useConfigStore } from '@_zustand/config'
import { useFormik } from 'formik'
import Copyright from '../Copyright'
import { schemaRequestReset, onForgotPassword } from './helpers'
import { useSharedStyles, stateSelector } from '../helpers'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import EmailSentSuccessfully from '../EmailSentSuccessfully'

const ForgotPasswordContainter = () => {
  const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  const formik = useFormik({
    initialValues: {},
    validationSchema: schemaRequestReset,
    onSubmit: onForgotPassword({ openSnackbar, setIsLoading, setEmailSent })
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
            ? <EmailSentSuccessfully key='success-request-password' />
            : <motion.div
              key='form-forgot-password'
              style={{ width: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
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
                <Grid container justify='center' style={{ marginTop: '2em' }} item xs={12}>
                  <Link passHref href={routesPaths[ZenRouteID.LOGIN].path}>
                    <a className={classes.link}>Back to login</a>
                  </Link>
                </Grid>
              </form>
            </motion.div>}
        </AnimatePresence>
      </Grid>
      <Copyright />
    </Grid>
  )
}

export default ForgotPasswordContainter
