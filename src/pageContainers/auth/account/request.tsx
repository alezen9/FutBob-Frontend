import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import ThemeModeSwitch from '@_components/ThemeModeSwitch'
import { FutBobLogo } from '@_icons'
import { useConfigStore } from '@_zustand/config'
import { useFormik } from 'formik'
import Copyright from '../Copyright'
import { schemaRequestAccount, onRequestAccount } from './helpers'
import { useSharedStyles, stateSelector } from '../helpers'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { SexOpts } from '@_utils/constants/SexOpts'
import Link from 'next/link'
import EmailSentSuccessfully from '../EmailSentSuccessfully'
import { AnimatePresence, motion } from 'framer-motion'

const RequestAccountContainer = () => {
  const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  const formik = useFormik({
    initialValues: {},
    validationSchema: schemaRequestAccount,
    onSubmit: onRequestAccount({ openSnackbar, setIsLoading, setEmailSent })
  })

  const classes = useSharedStyles({ isSubmitting: formik.isSubmitting })

  return (
    <Grid container justify='space-between' alignItems='center' direction='column' className={classes.main}>
      <div className={classes.themeToggleClass}>
        <ThemeModeSwitch />
      </div>
      <FutBobLogo className={classes.logo} />
      <Grid container direction='column' alignItems='center' item xs={12} sm={8} style={{ marginTop: '10vh' }}>
        <FutBobLogo style={{ fontSize: '4em' }} />
        <AnimatePresence exitBeforeEnter>
          {emailSent
            ? <EmailSentSuccessfully key='success-send-account' />
            : <motion.div
              key='form-request-account'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <form className={classes.formRegister} onSubmit={formik.handleSubmit}>
                <Grid item container spacing={3}>
                  <FormikInput
                    name='name'
                    label='Name'
                    sm={6}
                    required
                    {...formik} />
                  <FormikInput
                    name='surname'
                    label='Surname'
                    sm={6}
                    required
                    {...formik} />
                  <FormikInput
                    name='email'
                    label='Email'
                    sm={6}
                    required
                    {...formik} />
                  <FormikInput
                    name='phone'
                    label='Phone number'
                    sm={6}
                    type='phone'
                    required
                    {...formik} />
                  <FormikInput
                    name='sex'
                    label='Sex'
                    type='select'
                    options={SexOpts}
                    sm={6}
                    required
                    {...formik} />
                  <FormikInput
                    name='dateOfBirth'
                    label='Date of birth'
                    sm={6}
                    type='date'
                    required
                    {...formik} />
                  <FormikInput
                    name='country'
                    label='Country'
                    type='autocomplete'
                    options={CountriesOpts}
                    required
                    {...formik} />
                </Grid>
                <Grid item sm={6} style={{ margin: '1.5em auto auto auto' }}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    disabled={formik.isSubmitting}
                    className={classes.submit}>
                  Register
                  </Button>
                </Grid>
              </form>
            </motion.div>}
        </AnimatePresence>
        <Grid container justify='center' style={{ margin: '2em auto' }} item xs={12} sm={6}>
          <Link passHref href={routesPaths[ZenRouteID.LOGIN].path}>
            <a className={classes.link}>Already have an account</a>
          </Link>
        </Grid>
      </Grid>
      <Copyright />
    </Grid>
  )
}

export default RequestAccountContainer
