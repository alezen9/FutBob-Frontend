import React from 'react'
import { Grid, Button } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty } from 'lodash'
import { TabProps } from '..'
import { onUpdateMyPassword, schema } from './helpers'

const Private: React.FC<TabProps> = props => {
  const {
    setIsLoading,
    updateMyPassword
  } = props


  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: onUpdateMyPassword({ setIsLoading, updateMyPassword }),
    validationSchema: schema
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item container justify='center' style={{ margin:'auto' }} spacing={3} sm={10}>
        <FormikInput
          sm={6}
          name='oldPassword'
          label='Current password'
          type='password'
          required
          {...formik}
        />
        <FormikInput
          sm={6}
          name='newPassword'
          label='New password'
          type='password'
          required
          {...formik}
        />
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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

export default React.memo(Private)
