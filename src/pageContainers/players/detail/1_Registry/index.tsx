import React, { useMemo } from 'react'
import { Grid, Button, Hidden, Fab } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { isEmpty, get } from 'lodash'
import { useFormik } from 'formik'
import { TabProps } from '..'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { onUpdateMyRegistry, schema } from './helpers'
import { SexOpts } from '@_utils/constants/SexOpts'



const Registry: React.FC<TabProps> = props => {
  const {
    item: { _id, registry, credentials: { email } },
    setIsLoading,
    updateMyRegistry
  } = props

  const initCountry = useMemo(() => {
    if(!registry.country) return null
    if(CountriesOpts) return CountriesOpts.find(({ value }) => value === registry.country)
    return null
  }, [get(registry, 'country', null)])

  const formik = useFormik({
    initialValues: { 
       initialValues: { _id, ...registry, email },
      _id, ...registry, country: initCountry, email },
    enableReinitialize: true,
    onSubmit: onUpdateMyRegistry({ setIsLoading, updateMyRegistry }),
    validationSchema: schema
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} style={{ margin:'auto' }}>
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
          name='email'
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

export default React.memo(Registry)
