import React, { useCallback, useState } from 'react'
import { Grid, Button, useMediaQuery, useTheme } from '@material-ui/core'
import FormikInput, { OptionType } from '@_components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, get } from 'lodash'
import { eurosToCents, getOptionsByEnum } from '@_utils/helpers'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import { ZenPalette } from '@_palette'
import { useRouter } from 'next/router'
import { ConfigStore } from '@_zustand/helpers'
import { createEditFieldValidationSchema } from './validations'
import { useSWRField } from '@_swr/Fields'
import { FieldState, FieldType } from '@_SDK_Field/entities'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import FutsalField from '@_components/FutsalField'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded'
import { RadiationIcon } from '@_icons'

const turfOptions: OptionType[] = [
   {
      value: FieldState.Great,
      label: 'Great',
      component: <span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
         <ThumbUpRoundedIcon style={{ color: 'limegreen', fontSize: '1.2em' }} />
         <span style={{ marginLeft: '1em' }}>Great</span>
      </span>
   },
   {
      value: FieldState.NotGreatNotTerrible,
      label: 'Not great not terrible',
      component: <span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
         <RadiationIcon style={{ color: 'orange', fontSize: '1.2em' }} />
         <span style={{ marginLeft: '1em' }}>Not great not terrible</span>
      </span>
   },
   {
      value: FieldState.Terrible,
      label: 'Terrible',
      component: <span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
         <ThumbDownRoundedIcon style={{ color: 'crimson', fontSize: '1.2em' }} />
         <span style={{ marginLeft: '1em' }}>Terrible</span>
      </span>
   }
]

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
          ...values.price
            ? { price: eurosToCents(values.price )}
            : {}
       }
      setSubmitting(true)
      setIsLoading(true)
      try {
        const _id = await createEditField(vals)
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
         ? { ...item, price: item.price / 100 }
         : {}
    },
    enableReinitialize: true,
    validationSchema: createEditFieldValidationSchema,
    onSubmit
  })

  const onTypeChange = useCallback((type: string) => {
     formik.setFieldValue('type', type === 'outdoor' ? FieldType.Outdoor : FieldType.Indoor)
      .then(() => formik.setFieldTouched('type', true))
  }, [formik.setFieldTouched, formik.setFieldValue])

  return (
    <>
      <Grid container spacing={3}>
         <Grid item container xs={12} md={6} justify='center'>
            <FutsalField
               onTypeChange={onTypeChange}
               withPlayers={false}
               type={get(item, 'type', FieldType.Outdoor) === FieldType.Outdoor ? 'outdoor' : 'indoor'}/>
         </Grid>
         <Grid item container xs={12} md={6} spacing={3} justify='center'>
        <FormikInput
          sm={6}
          name='name'
          label='Name'
          required
          {...formik}
        />
        <FormikInput
          sm={6}
          name='price'
          label='Price'
          inputProps={{
             endAdornment: '€'
          }}
          required
          {...formik}
        />
        <FormikInput
          sm={6}
          name='measurements.width'
          label='Width'
          inputProps={{
             endAdornment: 'm'
          }}
          required
          {...formik}
        />
        <FormikInput
          sm={6}
          name='measurements.height'
          label='Length'
          inputProps={{
             endAdornment: 'm'
          }}
          required
          {...formik}
        />
        <FormikInput
          sm={6}
          name='location.coordinates[0]'
          label='Latitude'
          inputProps={{
             endAdornment: <ExploreOutlinedIcon />
          }}
          required
          {...formik}
        />
        <FormikInput
          sm={6}
          name='location.coordinates[1]'
          label='Longitude'
          inputProps={{
             endAdornment: <ExploreOutlinedIcon />
          }}
          required
          {...formik}
        />
         <FormikInput
            sm={6}
            type='select'
            name='state'
            label='Turf state'
            options={turfOptions}
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

export default React.memo(FieldDetail)
