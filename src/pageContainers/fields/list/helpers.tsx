import React from 'react'
import { get } from 'lodash'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { Filter } from '@_components/Filters/Inputs'
import zenToolbox from '@_utils/toolbox'
import { Field, FieldType } from '@_SDK_Field/types'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import { FieldTurfTypeOpts } from '@_utils/constants/FieldTurfTypeOpts'

export const headers: TableHeaderData[] = [
   { name: 'Name', style: { minWidth: 230 } },
   { name: 'Type', style: { maxWidth: 70, textAlign: 'center' } },
   { name: 'Price', style: { minWidth: 130, textAlign: 'center' } },
   { name: 'State', style: { minWidth: 200, textAlign: 'left' } },
   { name: 'Dimensions', style: { maxWidth: 200, textAlign: 'center' } }
]

export const getFieldDataRow = ({ openDialog, goToDetails }) => (fieldData: Field) => {
   return {
      name: get(fieldData, 'name', 'Unknown field'),
      type: zenToolbox.decamelize(FieldType[get(fieldData, 'type', 0)]),
      price: get(fieldData, 'price', 0) === 0
         ? 'Free'
         : zenToolbox.centsToEurosFormatted(get(fieldData, 'price', 0)),
      state: FieldTurfTypeOpts.find(({ value }) => value === get(fieldData, 'state', 0)).component,
      dimensions: `${get(fieldData, 'measurements.height', 0)}x${get(fieldData, 'measurements.width', 0)} m`,
      actions: [
         {
            icon: <NavigateNextRoundedIcon />,
            label: 'Details',
            onClick: goToDetails(fieldData)
         },
         {
            icon: <DeleteForeverRoundedIcon />,
            label: 'Delete',
            onClick: openDialog(fieldData),
            color: 'crimson'
         }
      ]
   }
}

export const _FiltersField: Filter[] = [
   {
      type: 'select',
      name: 'type',
      label: 'Field type',
      options: zenToolbox.getOptionsByEnum(FieldType)
   },
   {
      type: 'select',
      name: 'states',
      label: 'Turf state',
      options: FieldTurfTypeOpts,
      multiple: true
   }
]