import React from 'react'
import { get } from 'lodash'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { Filter } from '@_components/Filters/Inputs'
import { zenToolboxInstance } from '@_utils/Toolbox'
import { Field, FieldState, FieldType } from '@_SDK_Field/types'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import { FieldTurfTypeOpts } from '@_utils/constants/FieldTurfTypeOpts'

export const headers: TableHeaderData[] = [
  { name: 'Name', style: { minWidth: 230 }, sticky: true },
  { name: 'Type', style: { maxWidth: 70, textAlign: 'center' } },
  { name: 'Price', style: { minWidth: 130, textAlign: 'center' } },
  { name: 'State', style: { minWidth: 200, textAlign: 'center' } },
  { name: 'Dimensions', style: { maxWidth: 200, textAlign: 'center' } }
]

export const getFieldDataRow = ({ openDialog, goToDetails }) => (fieldData: Field) => {
  return {
    name: get(fieldData, 'name', 'Unknown field'),
    type: zenToolboxInstance.decamelize(FieldType[get(fieldData, 'type', 0)]),
    price: zenToolboxInstance.centsToEuros(get(fieldData, 'price', 0)),
    state: zenToolboxInstance.decamelize(FieldState[get(fieldData, 'state', 0)]),
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
   options: zenToolboxInstance.getOptionsByEnum(FieldType)
  },
  {
   type: 'select',
   name: 'states',
   label: 'Turf state',
   options: FieldTurfTypeOpts,
   multiple: true
  }
]