import React, { useCallback } from 'react'
import { Grid, Button, Hidden } from '@material-ui/core'
import FormikInput from '../../../components/FomrikInput'
import { get } from 'lodash'
import { useFormik } from 'formik'
import { apiInstance } from '../../../SDK'
import { ServerMessage } from '../../../utils/serverMessages'

const Private = props => {
  const {
    item: { username },
    setItem,
    setIsLoading,
    openSnackbar
  } = props

  const onSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true)
      setIsLoading(true)
      try {
        let done = false
        const { username, oldPassword, newPassword } = values
        if (username !== props.item.username) {
          done = await apiInstance.user_changeUsername(username)
        }
        if (oldPassword && newPassword) {
          done = await apiInstance.user_changePassword(oldPassword, newPassword)
        }
        if (done) {
          setItem({ username })
          openSnackbar({
            variant: 'success',
            message: 'Edit successful!'
          })
        }
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || ServerMessage.generic
        })
      }
      setIsLoading(false)
      setSubmitting(false)
    }, [])

  const formik = useFormik({
    initialValues: { username },
    enableReinitialize: true,
    onSubmit
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
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='newPassword'
          label='New password'
          type='password'
          required
          {...formik}
        />
        <Grid item xs={12} align='right'>
          <Button
            onClick={formik.handleSubmit}
            variant='contained'
            color='primary'>
                Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default React.memo(Private)
