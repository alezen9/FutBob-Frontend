import React, { useCallback, useMemo } from 'react'
import { Grid, Button, Hidden, Fab } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { isEqual, isEmpty, get } from 'lodash'
import { useFormik } from 'formik'
import { apiInstance } from 'src/SDK'
import { ServerMessage } from '@_utils/serverMessages'
import { generalInfoSchema } from '../validations'
import { CountryOptions } from '@_utils/nationalities'
import cleanDeep from 'clean-deep'
import { ProfileTabProps } from '..'
import { EditableUser } from '@_SDK_User/types'



const General = (props: ProfileTabProps) => {
  const {
    item: { _id, username, player, registry, ...rest },
    mutate,
    setIsLoading,
    openSnackbar
  } = props

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        if (!isEqual(registry, values)) {
          const newVals: EditableUser = cleanDeep({
            ...values,
            ...values.country && { country: get(values, 'country.value', 'IT') }
          })
          const done = await apiInstance.user.updateMe(newVals)
          if (done) {
            mutate(newVals)
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
    }, [JSON.stringify(registry), mutate])

  const initCountry = useMemo(() => {
    if(!registry.country) return null
    if(CountryOptions) return CountryOptions.find(({ value }) => value === registry.country)
    return null
  }, [CountryOptions, get(registry, 'country', null)])

  const formik = useFormik({
    initialValues: { ...registry, country: initCountry },
    enableReinitialize: true,
    onSubmit,
    validationSchema: generalInfoSchema
  })

  return (
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
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            style={{ minWidth: 150 }}
            disabled={formik.isSubmitting || isEmpty(formik.touched)}
            onClick={() => formik.handleSubmit()}
            variant='contained'
            color='primary'>
                Update
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default React.memo(General)
