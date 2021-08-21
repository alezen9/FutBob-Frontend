import { Grid } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import zenHooks from '@_utils/hooks'
import zenToolbox from '@_utils/toolbox'
import { useFormik } from 'formik'
import { get } from 'lodash'
import React, { useCallback } from 'react'
import { AppointmentInvites, AppointmentPlayerType } from 'src/SDK/Modules/Appointment/types'

type Props = {
   _id: string
   invites: AppointmentInvites
}

const _Invites: React.FC<Props> = props => {
   const { searchPlayersAndFreeAgentsOnType } = zenHooks.asyncSearch.usePlayersAndFreeAgentsAsyncSearch()
   const { searchPlayersOnType } = zenHooks.asyncSearch.usePlayersAsyncSearch()

   const onSubmit = useCallback((values, { setIsSubmitting, resetForm }) => {

   }, [])

   const formik = useFormik({
      initialValues: {
         _id: props._id,
         invites: {
            blacklisted: zenToolbox.appointmentTypePlayerListToOptionList(get(props, 'invites.lists.blacklisted', [])),
            confirmed: zenToolbox.appointmentTypePlayerListToOptionList(get(props, 'invites.lists.confirmed', [])),
            invited: get(props, 'invites.lists.invited', []).map(el => {
               const fullName = `${el.player.user.registry.surname} ${el.player.user.registry.name}`
               return {
                  label: fullName,
                  value: el.player._id
               }
            })
         }
      },
      enableReinitialize: true,
      onSubmit
   })

   return (
      <Grid container spacing={3} justify='space-between'>
         <FormikInput
            label='Invited'
            name='invites.invited'
            type='asyncAutocomplete'
            multiple
            halfWidthChip
            sm={6}
            onSearchText={searchPlayersOnType}
            {...formik}
         />
         <FormikInput
            label='Confirmed'
            name='invites.confirmed'
            type='asyncAutocomplete'
            multiple
            halfWidthChip
            sm={6}
            onSearchText={searchPlayersAndFreeAgentsOnType}
            valuesToexcludeFromOptions={formik.values.invites.blacklisted.map(el => el.value)}
            {...formik}
         />
         <FormikInput
            label='Blacklisted'
            name='invites.blacklisted'
            type='autocomplete'
            multiple
            halfWidthChip
            sm={6}
            options={formik.values.invites.invited}
            valuesToexcludeFromOptions={formik.values.invites.confirmed.map(el => el.value)}
            {...formik}
         />
      </Grid>
   )
}

export default _Invites