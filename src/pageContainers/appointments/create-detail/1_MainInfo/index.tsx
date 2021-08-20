import { Grid, Hidden } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import zenHooks from '@_utils/hooks'
import { useFormik } from 'formik'
import React from 'react'

const _MainInfo = () => {
   const { searchFieldsOnType } = zenHooks.asyncSearch.useFieldsAsyncSearch()

   const formik = useFormik({
      initialValues: {},
      enableReinitialize: true,
      onSubmit: () => { }
   })

   return (
      <Grid container justify='space-between'>
         <FormikInput
            label='Field'
            name='field'
            type='asyncAutocomplete'
            sm={6}
            onSearchText={searchFieldsOnType}
            {...formik}
         />
         <FormikInput
            label='Price per player'
            name='pricePerPlayer'
            sm={4}
            inputProps={{
               endAdornment: '€'
            }}
            {...formik}
         />
         <FormikInput
            label='Start date'
            name='startDate'
            type='date'
            sm={4}
            {...formik}
         />
         <Hidden smDown>
            <Grid item sm={4} />
         </Hidden>
         <FormikInput
            label='End date'
            name='endDate'
            type='date'
            sm={4}
            {...formik}
         />
         <FormikInput
            label='Start time'
            name='startTime'
            type='time'
            sm={4}
            {...formik}
         />
         <Hidden smDown>
            <Grid item sm={4} />
         </Hidden>
         <FormikInput
            label='End time'
            name='endTime'
            type='time'
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
