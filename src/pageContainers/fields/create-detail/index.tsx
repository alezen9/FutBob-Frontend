import React, { useCallback, useEffect, useState } from 'react'
import { Grid, Button, useMediaQuery, useTheme } from '@mui/material'
import FormikInput from '@_components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, get } from 'lodash'
import { ZenPalette } from '@_MUITheme'
import { useRouter } from 'next/router'
import { useSWRField } from '@_swr/Fields'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import FutsalField from '@_components/FutsalField'
import { schema, onSubmit } from './helpers'
import { ConfigStore } from '@_zustand/config/helpers'
import { useConfigStore } from '@_zustand/config'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { FieldState, FieldType } from '@_SDK_Field/types'
import zenToolbox from '@_utils/toolbox'
import { FieldTurfTypeOpts } from '@_utils/constants/FieldTurfTypeOpts'
import zenHooks from '@_utils/hooks'

const stateSelector = (state: ConfigStore) => ({
   setIsLoading: state.setIsLoading
})

const FieldDetail = () => {
   const router = useRouter()
   const { _id } = router.query
   const { item, createField, updateField, deleteField } = useSWRField(_id as string)
   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
   const { setIsLoading } = useConfigStore(stateSelector)
   const [openConfirmDelete, setOpenConfirmDelete] = useState(null)
   const isMounted = zenHooks.utils.useIsMounted()
   const { location, ...rest } = item

   const replaceRouteWithID = useCallback((_id: string) => {
      router.replace(routesPaths[ZenRouteID.FIELDS_DETAIL].path, routesPaths[ZenRouteID.FIELDS_DETAIL].as({ _id }))
   }, [])

   const formik = useFormik({
      initialValues: {
         state: FieldState.NotGreatNotTerrible,
         type: FieldType.Outdoor,
         location: {
            type: 'Point',
            ...item._id && {
               coordinates: {
                  lat: location.coordinates[0],
                  long: location.coordinates[1]
               }
            }
         },
         ...rest,
         ...item._id && { price: zenToolbox.centsToEuros(item.price) }
      },
      enableReinitialize: true,
      validationSchema: schema,
      onSubmit: onSubmit({ createField, updateField, setIsLoading, replaceRouteWithID })
   })

   const onDelete = useCallback(async () => {
      setIsLoading(true)
      if (get(item, '_id', null)) {
         await deleteField(get(item, '_id', null))
         router.replace(routesPaths[ZenRouteID.FIELDS].path)
      }
      if (isMounted.current) setOpenConfirmDelete(null)
      setIsLoading(false)
   }, [get(item, '_id', null), deleteField, setIsLoading])

   const onTypeChange = useCallback((type: string) => {
      formik.setFieldValue('type', type === 'outdoor' ? FieldType.Outdoor : FieldType.Indoor)
         // @ts-ignore
         .then(() => formik.setFieldTouched('type', true))
   }, [formik.setFieldTouched, formik.setFieldValue])

   return (
      <>
         <Grid container spacing={3} justify='center' style={{ marginTop: '2em' }}>
            <Grid item container xs={12} md={6} justify='center'>
               <FutsalField
                  onTypeChange={onTypeChange}
                  withPlayers={false}
                  type={get(item, 'type', FieldType.Outdoor) === FieldType.Outdoor ? 'outdoor' : 'indoor'} />
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
                  xs={6}
                  name='measurements.width'
                  label='Width'
                  inputProps={{
                     endAdornment: 'm'
                  }}
                  required
                  {...formik}
               />
               <FormikInput
                  xs={6}
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
                  name='location.coordinates.lat'
                  label='Latitude'
                  inputProps={{
                     endAdornment: <ExploreOutlinedIcon />
                  }}
                  required
                  {...formik}
               />
               <FormikInput
                  sm={6}
                  name='location.coordinates.long'
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
                  options={FieldTurfTypeOpts}
                  required
                  {...formik}
               />
            </Grid>
            <Grid item container xs={12} justify={isSmallScreen ? 'space-evenly' : 'flex-end'}>
               {item._id && <Grid item>
                  <Button
                     style={{ minWidth: 150, color: ZenPalette.error, marginRight: '1.5em', borderColor: ZenPalette.error }}
                     disabled={formik.isSubmitting}
                     onClick={() => setOpenConfirmDelete(true)}
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
            open={!!openConfirmDelete}
            text={<>You are about to delete <span style={{ fontWeight: 'bold' }}>{get(item, 'name', 'Unknown field')}</span>, continue and delete?</>}
            onClose={() => setOpenConfirmDelete(false)}
            onDelete={onDelete}
         />
      </>
   )
}

export default React.memo(FieldDetail)
