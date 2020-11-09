import React from 'react'
import { get } from 'lodash'
import { decamelize, getOptionsByEnum } from '@_utils/helpers'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { Filter } from '@_components/Filters/Inputs'
import { Field, FieldState, FieldType } from '@_entities/Fields'

export const headers = [
  { name: 'Name', style: { minWidth: 230 } },
  { name: 'Type', style: { maxWidth: 70, textAlign: 'center' } },
  { name: 'Cost', style: { minWidth: 130, textAlign: 'center' } },
  { name: 'State', style: { minWidth: 100, textAlign: 'center' } },
  { name: 'Dimensions', style: { maxWidth: 50, textAlign: 'center' } },
]

export const getFieldDataRow = ({ openDialog, goToDetails }) => (fieldData: Field) => {
  return {
    name: get(fieldData, 'name', 'Unknown field'),
    type: decamelize(FieldType[get(fieldData, 'type', 0)]),
    cost: get(fieldData, 'cost', 0) / 100,
    state: decamelize(FieldState[get(fieldData, 'state', 0)]),
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

export const fieldsFilters: Filter[] = [
  {
   type: 'select',
   name: 'type',
   label: 'Field type',
   options: getOptionsByEnum(FieldType)
  },
  {
   type: 'select',
   name: 'states',
   label: 'Turf state',
   options: getOptionsByEnum(FieldState),
   multiple: true
  }
]