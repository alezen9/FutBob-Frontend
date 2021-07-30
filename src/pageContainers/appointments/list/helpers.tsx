import React from 'react'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import { Filter } from '@_components/Filters/Inputs'
import zenToolbox from '@_utils/toolbox'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import { Appointment, AppointmentState } from 'src/SDK/Modules/Appointment/types'
import dayjs from 'dayjs'

const stateOpts = zenToolbox.getOptionsByEnum(AppointmentState)

export const headers: TableHeaderData[] = [
   { id: 'state', name: 'State', style: { minWidth: 150 } },
   { id: 'date', name: 'Date', style: { minWidth: 180, textAlign: 'left' } },
   { id: 'field', name: 'Field', style: { minWidth: 180, textAlign: 'left' } },
   // { name: 'Positions', style: { minWidth: 190, textAlign: 'center' } },
   // { id: 'country', name: 'Country', style: { minWidth: 280, textAlign: 'left' } },
   // { id: 'age', name: 'Age', style: { minWidth: 120, textAlign: 'center' } },
   // { name: 'Phone', style: { minWidth: 180 } }
]

export const getAppointmentDataRow = ({ goToDetails }) => (appointmentData: Appointment) => {
   return {
      state: stateOpts.find(({ value }) => value === appointmentData.state)?.label,
      date: dayjs(appointmentData.date.start).format('ddd MMM D YYYY, HH:mm'),
      field: appointmentData.field.name,
      actions: [
         {
            icon: <NavigateNextRoundedIcon />,
            label: 'Details',
            onClick: goToDetails(appointmentData)
         }
      ]
   }
}

export const _FiltersAppointment: Filter[] = [
   {
      type: 'select',
      name: 'states',
      label: 'Appointment state',
      options: stateOpts,
      multiple: true
   }
]