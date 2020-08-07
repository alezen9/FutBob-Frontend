import React, { useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import FormikInput from '../../../components/FomrikInput'
import { isEqual, isEmpty } from 'lodash'
import { useFormik } from 'formik'
import { apiInstance } from '../../../SDK'
import { ServerMessage } from '../../../utils/serverMessages'

const General = props => {
  const {
    item: { _id, username, ...rest },
    setItem,
    openSnackbar,
    setIsLoading
  } = props

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        if (!isEqual(rest, values)) {
          const done = await apiInstance.user_updateUserConnected(values)
          if (done) {
            setItem(values)
            openSnackbar({
              variant: 'success',
              message: 'Edit successful!'
            })
          }
        }
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || ServerMessage.generic
        })
      }
      setIsLoading(false)
      setSubmitting(false)
    }, [rest])

  const formik = useFormik({
    initialValues: rest,
    enableReinitialize: true,
    onSubmit
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <FormikInput
            sm={4}
            name='name'
            label='Name'
            required
            {...formik}
          />
          <FormikInput
            sm={4}
            name='surname'
            label='Surname'
            required
            {...formik}
          />
          <FormikInput
            sm={4}
            name='dateOfBirth'
            label='Date of birth'
            type='date'
            required
            {...formik}
          />
          <FormikInput
            sm={4}
            name='sex'
            label='Sex'
            type='select'
            options={[{ label: 'Male', value: 0 }, { label: 'Female', value: 1 }]}
            required
            {...formik}
          />
          <FormikInput
            sm={4}
            name='phone'
            label='Phone'
            type='phone'
            required
            {...formik}
          />
          <FormikInput
            sm={4}
            name='email'
            label='Email'
            {...formik}
          />
          <Grid item xs={12} align='right'>
            <Button
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
              variant='contained'
              color='primary'>
                Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default React.memo(General)
