import React, { useCallback, useState } from 'react'
import { Grid, Button, useMediaQuery, useTheme } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, get } from 'lodash'
import { eurosToCents } from '@_utils/helpers'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import { ZenPalette } from '@_palette'
import { useRouter } from 'next/router'
import { ConfigStore } from '@_zustand/helpers'
import { createEditFreeAgentValidationSchema } from './validations'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import { useSWRFreeAgent } from '@_swr/FreeAgent'

const stateSelector = (state: ConfigStore) => ({
    setIsLoading: state.setIsLoading,
    openSnackbar: state.openSnackbar,
    setPageTitle: state.setPageTitle
  })

const FreeAgentDetail = () => {
  const router = useRouter()
  const { id }: { id?: string } = router.query

  const { item, createEditFreeAgent, deleteFreeAgent } = useSWRFreeAgent(id)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const { setIsLoading, openSnackbar, setPageTitle } = useConfigStore(stateSelector)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(null)

  const onSubmit = useCallback(
    async (values, { setSubmitting, setTouched }) => {
       const vals = {
          ...values,
          ...values.price
            ? { price: eurosToCents(values.price )}
            : {}
       }
      setSubmitting(true)
      setIsLoading(true)
      try {
        const _id = await createEditFreeAgent(vals)
        if(!values._id && _id) router.replace('/free-agents/[id]', `/free-agents/${_id}`)
        if(!!_id) {
          openSnackbar({
            variant: 'success',
            message: values._id
              ? 'Free agent info updated successfully!'
              : 'Free agent created successfully'
          })
          const _pageTitle = `${get(values, 'surname', '-')} ${get(values, 'name', '-')}`
          setPageTitle(_pageTitle)
          setTouched({}, false)
        }
      } catch(error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      setSubmitting(false)
      setIsLoading(false)
    },[createEditFreeAgent, openSnackbar, setIsLoading, setPageTitle])

  const onDelete = useCallback(
    async () => {
      setIsLoading(true)
      try {
        const done = await deleteFreeAgent()
        if (!done) throw new Error()
        router.replace('/fields')
        openSnackbar({
          variant: 'success',
          message: 'Free agent deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      setOpenConfirmDialog(false)
      setIsLoading(false)
    }, [deleteFreeAgent, JSON.stringify(item), setOpenConfirmDialog, setIsLoading])

  const formik = useFormik({
    initialValues: { ...item },
    enableReinitialize: true,
    validationSchema: createEditFreeAgentValidationSchema,
    onSubmit
  })

  return (
    <>
      <Grid container spacing={3}>
         <Grid item container xs={12} spacing={3} justify='center'>
        <FormikInput
          sm={6}
          name='name'
          label='Name'
          required
          {...formik}
        />
        <FormikInput
          sm={6}
          name='surname'
          label='Surname'
          required
          {...formik}
        />
      </Grid>
      <Grid item container xs={12} justify={isSmallScreen ? 'space-evenly' : 'flex-end'}>
          {item._id && <Grid item>
            <Button
              style={{ minWidth: 150, color: ZenPalette.error, marginRight: '1.5em', borderColor: ZenPalette.error }}
              disabled={formik.isSubmitting}
              onClick={() => setOpenConfirmDialog(true)}
              variant='outlined'>
          Delete
            </Button>
          </Grid>}
          <Grid item>
            <Button
              style={{ minWidth: 150 }}
              disabled={formik.isSubmitting || isEmpty(formik.touched)}
              onClick={formik.handleSubmit as any}
              variant='contained'
              color='primary'>
              {item._id ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <WarningDeleteDialog
         open={!!openConfirmDialog}
         text={<>You are about to delete <span style={{ fontWeight: 'bold' }}>{get(item, 'name', 'Unknown field')}</span>, continue and delete?</>}
         onClose={() => setOpenConfirmDialog(false)}
         onDelete={onDelete}
      />
    </>
  )
}

export default React.memo(FreeAgentDetail)
