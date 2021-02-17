import React from 'react'
import { get } from 'lodash'
import { OverallScore } from '@_icons'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { Filter } from '@_components/Filters/Inputs'
import { getPlayerOverall } from '@_utils/playerOverall'
import { Player, PlayerPosition } from '@_SDK_Player/types'
import dayjs from 'dayjs'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { PhysicalStateOpts } from '@_utils/constants/PhysicalStatusOpt'
import { zenToolboxInstance } from '@_utils/Toolbox'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import GroupedPositions from '@_components/GroupedPositions'

export const headers: TableHeaderData[] = [
  { name: 'Name', style: { minWidth: 230 } },
  { name: 'Physical state', style: { minWidth: 180, textAlign: 'left' } },
  { name: 'Positions', style: { minWidth: 190, textAlign: 'center' } },
  { name: 'Country', style: { minWidth: 280, textAlign: 'left' } },
  { name: 'Age', style: { maxWidth: 70, textAlign: 'center' } },
  { name: 'Phone', style: { minWidth: 180 } }
]

export const getPlayerDataRow = ({ openDialog, goToDetails, userConnectedId }) => (playerData: Player) => {
  const { overall } = getPlayerOverall(playerData.score, playerData.positions)
  return {
    _isUser: userConnectedId === playerData.user._id,
    name: <span style={{ display: 'flex', alignItems: 'center' }}>
      <OverallScore value={overall} style={{ transform: 'scale(.75)' }} />
      {`${playerData.user.registry.surname} ${playerData.user.registry.name}`}
    </span>,
    fullName: `${playerData.user.registry.surname} ${playerData.user.registry.name}`,
    physicalState: PhysicalStateOpts.find(({ value }) => value === get(playerData, 'state', 0)).component,
    age: dayjs().diff(playerData.user.registry.dateOfBirth, 'years'),
    phone: playerData.user.registry.phone,
    country: CountriesOpts.find(({ value }) => value === playerData.user.registry.country).component,
    positions: <GroupedPositions positions={get(playerData, 'positions', [])} />,
    actions: [
      {
        icon: <NavigateNextRoundedIcon />,
        label: 'Details',
        onClick: goToDetails(playerData)
      },
      {
        icon: <DeleteForeverRoundedIcon />,
        label: 'Delete',
        onClick: openDialog(playerData),
        color: 'crimson'
      }
    ]
  }
}

export const _FiltersPlayer: Filter[] = [
  {
   type: 'select',
   name: 'states',
   label: 'Physical state',
   options: PhysicalStateOpts,
   multiple: true
  },
  {
   type: 'select',
   name: 'positions',
   label: 'Position',
   options: zenToolboxInstance.getOptionsByEnum(PlayerPosition),
   multiple: true
  },
  {
   type: 'autocomplete',
   name: 'countries',
   label: 'Nationality',
   options: CountriesOpts,
   multiple: true
  }
]