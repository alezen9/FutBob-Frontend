import React, { useMemo } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import FormikInput, { FormikEssentials } from '@_components/FormikInput'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { SexOpts } from '@_utils/constants/SexOpts'
import PlayerCard from '@_components/PlayerCard'
import { useFormik } from 'formik'
import { Player } from '@_SDK_Player/types'
import { get } from 'lodash'


type Props = {
   item: Player
   isMe: boolean
   // updatePlayerRegistry: any
}

const _Registry: React.FC<Props> = props => {
   const { item, isMe } = props

   const initCountry = useMemo(() => {
      const _country = get(item, 'user.registry.country', null)
      if(!_country) return null
      if(CountriesOpts) return CountriesOpts.find(({ value }) => value === _country)
      return null
   }, [get(item, 'user.registry.country', null)])

   const formik = useFormik({
      initialValues: {
         ...get(item, 'user.registry', {}),
         country: initCountry
      },
      enableReinitialize: true,
      onSubmit: () => {}
   })

  return (
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
          name='additionalInfo.email'
          label={isMe ? 'Additional email' : 'Email'}
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
      </Grid>
  )
}

export default React.memo(_Registry)
