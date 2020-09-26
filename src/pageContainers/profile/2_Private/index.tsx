import React, { useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { useFormik } from 'formik'
import { apiInstance } from 'src/SDK'
import { ServerMessage } from '@_utils/serverMessages'
import { privateInfoSchema } from '../validations'
import { get, isEmpty } from 'lodash'
import { ProfileTabProps } from '..'

const Private = (props: ProfileTabProps) => {
  const {
    item: { username },
    mutate,
    setIsLoading,
    openSnackbar
  } = props

  const onSubmit = useCallback(
    async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        let done = false
        const { username, oldPassword, newPassword }: { username?: string, oldPassword?: string, newPassword?: string } = values
        if (username && username !== props.item.username) {
          done = await apiInstance.user_changeUsername(username)
          mutate({ username })
        }
        if (oldPassword && newPassword) {
          done = await apiInstance.user_changePassword(oldPassword, newPassword)
        }
        if (done) {
          openSnackbar({
            variant: 'success',
            message: 'Info updated successfully!'
          })
          setFieldValue('oldPassword', '', false)
          setFieldValue('newPassword', '', false)
        }
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || get(error, 'message', error)
        })
      }
      setIsLoading(false)
      setSubmitting(false)
    }, [])

  const formik = useFormik({
    initialValues: { username },
    enableReinitialize: true,
    onSubmit,
    validationSchema: privateInfoSchema
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <FormikInput
          sm={4}
          name='username'
          label='Username'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='oldPassword'
          label='Old password'
          type='password'
          required={!!get(formik, 'values.oldPassword', null) || !!get(formik, 'values.newPassword', null)}
          {...formik}
        />
        <FormikInput
          sm={4}
          name='newPassword'
          label='New password'
          type='password'
          required={!!get(formik, 'values.newPassword', null) || !!get(formik, 'values.oldPassword', null)}
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
