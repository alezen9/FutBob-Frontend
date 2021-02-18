import React, { useMemo } from 'react'
import { Button, Grid, Hidden } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { SexOpts } from '@_utils/constants/SexOpts'
import { useFormik } from 'formik'
import { get, isEmpty } from 'lodash'
import { TabProps } from '..'
import { onUpdatePlayerRegistry, schema } from './helpers'


const _Registry: React.FC<TabProps> = props => {
   const { item, isMe, setIsLoading, updatePlayerRegistry } = props

   const initCountry = useMemo(() => {
      const _country = get(item, 'user.registry.country', null)
      if(!_country) return null
      if(CountriesOpts) return CountriesOpts.find(({ value }) => value === _country)
      return null
   }, [get(item, 'user.registry.country', null)])

   const formik = useFormik({
      initialValues: {
         initialValues: { _id: get(item, 'user._id', null), ...get(item, 'user.registry', {}) },
         _id: get(item, 'user._id', null),
         ...get(item, 'user.registry', {}),
         country: initCountry
      },
      enableReinitialize: true,
      validationSchema: schema,
      onSubmit: onUpdatePlayerRegistry({ isMe, setIsLoading, updatePlayerRegistry })
   })

  return (
      <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} justify='center' >
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
          options={SexOpts}
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
          name='additionalInfo.email'
          label='Email'
          {...formik}
        />
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
        <FormikInput
          sm={4}
          name='country'
          label='Nationality'
          type='autocomplete'
          options={CountriesOpts}
          required
          {...formik}
        />
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
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

export default React.memo(_Registry)