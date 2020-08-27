import React, { useCallback } from 'react'
import { Grid, Button, Hidden } from '@material-ui/core'
import FormikInput from '../../../components/FormikInput'
import { isEqual, isEmpty, get } from 'lodash'
import { useFormik } from 'formik'
import { apiInstance } from '../../../SDK'
import { ServerMessage } from '../../../utils/serverMessages'
import { generalInfoSchema } from '../validations'
import { CountryOptions } from '../../../utils/nationalities'

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
          const newVals = {
            ...values,
            ...values.country && { country: get(values, 'country.value', 'IT') }
          }
          const done = await apiInstance.user_updateUserConnected(newVals)
          if (done) {
            setItem(newVals)
            openSnackbar({
              variant: 'success',
              message: 'Info updated successfully!'
            })
          }
        }
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || get(error, 'message', error)
        })
      }
      setIsLoading(false)
      setSubmitting(false)
    }, [rest])

  const formik = useFormik({
    initialValues: { ...rest, country: CountryOptions.find(({ value }) => value === rest.country) },
    enableReinitialize: true,
    onSubmit,
    validationSchema: generalInfoSchema
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
          <Hidden only='xs'>
            <Grid item xs={4} />
          </Hidden>
          <FormikInput
            sm={4}
            name='country'
            label='Nationality'
            type='autocomplete'
            options={CountryOptions}
            required
            {...formik}
          />
          <Hidden only='xs'>
            <Grid item xs={4} />
          </Hidden>
          <Grid item xs={12} align='right'>
            <Button
              style={{ minWidth: 150 }}
              disabled={formik.isSubmitting || isEmpty(formik.touched)}
              onClick={formik.handleSubmit}
              variant='contained'
              color='primary'>
                Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default React.memo(General)
