import React from 'react'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import { Filter } from '@_components/Filters/Inputs'
import zenToolbox from '@_utils/toolbox'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import { Appointment, AppointmentState } from 'src/SDK/Modules/Appointment/types'

export const headers: TableHeaderData[] = [
   { id: 'name', name: 'Name', style: { minWidth: 280 }, sticky: true },
   // { name: 'Physical state', style: { minWidth: 180, textAlign: 'left' } },
   // { name: 'Positions', style: { minWidth: 190, textAlign: 'center' } },
   // { id: 'country', name: 'Country', style: { minWidth: 280, textAlign: 'left' } },
   // { id: 'age', name: 'Age', style: { minWidth: 120, textAlign: 'center' } },
   // { name: 'Phone', style: { minWidth: 180 } }
]

export const getAppointmentDataRow = ({ goToDetails }) => (appointmentData: Appointment) => {
   return {
      name: 'Aleks',
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
      options: zenToolbox.getOptionsByEnum(AppointmentState),
      multiple: true
   }
]