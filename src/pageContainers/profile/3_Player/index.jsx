import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import FormikInput from '../../../components/FomrikInput'
import { get } from 'lodash'
import { useFormik } from 'formik'

const Player = props => {
  const { item } = props

  const onSubmit = useCallback(
    async values => {
    //   setIsLoading(true)
      try {
        // const item = await apiInstance.user_getUserConnected(userFields)
        // setItem(item)
      } catch (error) {
        // openSnackbar({
        //   variant: 'error',
        //   message: get(error, 'message', null) || 'Username o password errati'
        // })
      }
    //   setIsLoading(false)
    }, [])

  const formik = useFormik({
    initialValues: item,
    enableReinitialize: true,
    onSubmit
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
      </Grid>
    </form>
  )
}

export default React.memo(Player)
