import React from 'react'
import { get } from 'lodash'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import { FreeAgent } from '@_SDK_FreeAgent/entities'

export const headers: TableHeaderData[] = [
  { name: 'Name', style: { minWidth: 230 }, sticky: true },
  { name: 'Surname', style: { maxWidth: 70, textAlign: 'center' } }
]

export const getFreeAgentsDataRow = ({ openDialog, goToDetails }) => (freeAgentData: FreeAgent) => {
  return {
      name: get(freeAgentData, 'name', '-'),
      surname: get(freeAgentData, 'surname', '-'),
      actions: [
         {
         icon: <NavigateNextRoundedIcon />,
         label: 'Details',
         onClick: goToDetails(freeAgentData)
         },
         {
         icon: <DeleteForeverRoundedIcon />,
         label: 'Delete',
         onClick: openDialog(freeAgentData),
         color: 'crimson'
         }
      ]
   }
}