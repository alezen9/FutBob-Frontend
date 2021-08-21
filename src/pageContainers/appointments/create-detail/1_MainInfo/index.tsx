import { Grid, Hidden } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { Field, FieldType } from '@_SDK_Field/types'
import zenHooks from '@_utils/hooks'
import zenToolbox from '@_utils/toolbox'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { get } from 'lodash'
import React from 'react'
import { useCallback } from 'react'
import { AppointmentDate, AppointmentState } from 'src/SDK/Modules/Appointment/types'

type Props = {
   _id: string
   mainInfo: {
      date: AppointmentDate
      field: Field
      state: AppointmentState
      pricePerPlayer: number
      notes?: string
   }
}

const _MainInfo: React.FC<Props> = props => {
   const { searchFieldsOnType } = zenHooks.asyncSearch.useFieldsAsyncSearch()

   const onSubmit = useCallback((values, { setIsSubmitting, resetForm }) => {

   }, [])

   const formik = useFormik({
      initialValues: {
         ...get(props, 'mainInfo.field._id', null) && {
            _id: props._id,
            field: {
               label: get(props, 'mainInfo.field.name', 'Unknown field'),
               value: get(props, 'mainInfo.field._id', null),
               type: get(props, 'mainInfo.field.type', FieldType.Outdoor)
            },
            pricePerPlayer: zenToolbox.centsToEuros(props.mainInfo.pricePerPlayer),
            notes: props.mainInfo.notes,
            start: dayjs(props.mainInfo.date.start),
            end: dayjs(props.mainInfo.date.end)
         }
      },
      enableReinitialize: true,
      onSubmit
   })

   return (
      <Grid container spacing={3} justify='space-between'>
         <FormikInput
            label='Field'
            name='field'
            type='asyncAutocomplete'
            sm={4}
            onSearchText={searchFieldsOnType}
            {...formik}
         />
         <Hidden smDown>
            <Grid item sm={5} />
         </Hidden>
         <FormikInput
            label='Price per player'
            name='pricePerPlayer'
            sm={3}
            inputProps={{
               endAdornment: '€'
            }}
            {...formik}
         />
         <FormikInput
            label='Start'
            name='start'
            type='dateTime'
            sm={4}
            {...formik}
         />
         <FormikInput
            label='End'
            name='end'
            type='dateTime'
            sm={4}
            {...formik}
         />
         <FormikInput
            label='Notes'
            name='notes'
            rows={6}
            multiline
            sm={12}
            onSearchText={searchFieldsOnType}
            {...formik}
         />
      </Grid>
   )
}

export default _MainInfo
