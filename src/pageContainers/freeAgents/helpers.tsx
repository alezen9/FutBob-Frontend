import React from 'react'
import { get } from 'lodash'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import { FreeAgent } from '@_SDK_FreeAgent/types'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

export const headers: TableHeaderData[] = [
  { name: 'Name', style: { minWidth: 230 } },
  { name: 'Surname', style: { minWidth: 230, textAlign: 'left' } }
]

export const getFreeAgentsDataRow = ({ openDeleteDialog, openCreateEditDialog }) => (freeAgendData: FreeAgent) => {
  return {
    name: get(freeAgendData, 'name', '-'),
    surname: get(freeAgendData, 'surname', '-'),
    actions: [
      {
        icon: <EditOutlinedIcon />,
        label: 'Edit',
        onClick: openCreateEditDialog(freeAgendData)
      },
      {
        icon: <DeleteForeverRoundedIcon />,
        label: 'Delete',
        onClick: openDeleteDialog(freeAgendData),
        color: 'crimson'
      }
    ]
  }
}