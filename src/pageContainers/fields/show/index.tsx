import React, { useCallback, useState } from 'react'
import { Grid, Button, useMediaQuery, useTheme } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, get } from 'lodash'
import { getOptionsByEnum } from '@_utils/helpers'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import { ZenPalette } from '@_palette'
import { useRouter } from 'next/router'
import { ConfigStore } from '@_zustand/helpers'
import { createEditFieldValidationSchema } from './validations'
import { useSWRField } from '@_swr/Fields'
import { FieldState, FieldType } from '@_entities/Fields'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'

const stateSelector = (state: ConfigStore) => ({
    setIsLoading: state.setIsLoading,
    openSnackbar: state.openSnackbar,
    pageTitle: state.pageTitle,
    setPageTitle: state.setPageTitle
  })

const FieldDetail = () => {
  const router = useRouter()
  const { id }: { id?: string } = router.query

  const { item, createEditField, deleteField } = useSWRField(id)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const { setIsLoading, openSnackbar, pageTitle, setPageTitle } = useConfigStore(stateSelector)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(null)

  const onSubmit = useCallback(
    async (values, { setSubmitting, setTouched }) => {
       const vals = {
          ...values,
          ...values.cost
            ? { cost: values.cost * 100 }
            : {}
       }
      setSubmitting(true)
      setIsLoading(true)
      const field = {
        ...vals,
        type: get(vals, 'type', FieldType.Outdoor),
        state: get(vals, 'state', FieldState.NotGreatNotTerrible)
      }
      try {
        const _id = await createEditField(field)
        if(!values._id && _id) router.replace('/fields/[id]', `/fields/${_id}`)
        if(!!_id) {
          openSnackbar({
            variant: 'success',
            message: values._id
              ? 'Field info updated successfully!'
              : 'Field created successfully'
          })
          const _pageTitle = get(values, 'name', 'Unknown field')
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
    },[createEditField, openSnackbar, setIsLoading, setPageTitle])

  const onDelete = useCallback(
    async () => {
      setIsLoading(true)
      try {
        const done = await deleteField()
        if (!done) throw new Error()
        router.replace('/fields')
        openSnackbar({
          variant: 'success',
          message: 'Field deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      setOpenConfirmDialog(false)
      setIsLoading(false)
    }, [deleteField, JSON.stringify(item), setOpenConfirmDialog, setIsLoading])

  const formik = useFormik({
    initialValues: {
      state: FieldState.NotGreatNotTerrible,
      type: FieldType.Outdoor,
      location: {
         type: 'Point'
      },
      ...item
         ? { ...item, cost: item.cost / 100 }
         : {}
    },
    enableReinitialize: true,
    validationSchema: createEditFieldValidationSchema,
    onSubmit
  })

  return (
    <>
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
          type='select'
          name='type'
          label='Field type'
          options={getOptionsByEnum(FieldType)}
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          type='select'
          name='state'
          label='Turf state'
          options={getOptionsByEnum(FieldState)}
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='cost'
          label='Cost'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='measurements.width'
          label='Width'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='measurements.height'
          label='Length'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='location.coordinates[0]'
          label='Latitude'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='location.coordinates[1]'
          label='Longitude'
          required
          {...formik}
        />
      <Grid item container xs={12} justify={isSmallScreen ? 'space-evenly' : 'flex-end'}>
          {item._id && <Grid item>
            <Button
              style={{ minWidth: 150, color: ZenPalette.darkRed, marginRight: '1.5em', borderColor: ZenPalette.darkRed }}
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

export default React.memo(FieldDetail)
