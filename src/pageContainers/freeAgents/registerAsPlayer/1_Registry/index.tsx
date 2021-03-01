import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import FormikInput, { FormikEssentials } from '@_components/FormikInput'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { SexOpts } from '@_utils/constants/SexOpts'
import PlayerCard from '@_components/PlayerCard'
import dayjs from 'dayjs'


type Props = {
   formik: FormikEssentials
}

const _Registry: React.FC<Props> = props => {
  const { formik } = props

  return (
      <Grid container spacing={3} style={{ margin:'auto' }}>
        <FormikInput
          sm={4}
          name='user.name'
          label='Name'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.surname'
          label='Surname'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.dateOfBirth'
          label='Date of birth'
          type='date'
          required
          minDate={dayjs().subtract(70, 'years')}
          maxDate={dayjs().subtract(5, 'years')}
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.sex'
          label='Sex'
          type='select'
          options={SexOpts}
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.phone'
          label='Phone'
          type='phone'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.additionalInfo.email'
          label='Email'
          {...formik}
        />
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
        <FormikInput
          sm={4}
          name='user.country'
          label='Nationality'
          type='autocomplete'
          options={CountriesOpts}
          required
          {...formik}
        />
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
      </Grid>
  )
}

export default React.memo(_Registry)
