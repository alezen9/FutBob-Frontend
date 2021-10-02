import React from 'react'
import { get } from 'lodash'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { Filter } from '@_components/Filters/Inputs'
import { getPlayerOverall } from '@_utils/playerOverall'
import { Player, PlayerPosition } from '@_SDK_Player/types'
import dayjs from 'dayjs'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { PhysicalStateOpts } from '@_utils/constants/PhysicalStatusOpt'
import zenToolbox from '@_utils/toolbox'
import { TableHeaderData } from '@_components/ZenTable/helpers'
import GroupedPositions from '@_components/GroupedPositions'
import Overall from '@_components/Overall'

export const headers: TableHeaderData[] = [
   { id: 'name', name: 'Name', style: { minWidth: 280 }, sticky: true },
   { name: 'Physical state', style: { minWidth: 180, textAlign: 'left' } },
   { name: 'Positions', style: { minWidth: 190, textAlign: 'center' } },
   { id: 'country', name: 'Country', style: { minWidth: 280, textAlign: 'left' } },
   { id: 'age', name: 'Age', style: { minWidth: 120, textAlign: 'center' } },
   { name: 'Phone', style: { minWidth: 180 } }
]

export const getPlayerDataRow = ({ openDialog, goToDetails, userConnectedId }) => (playerData: Player) => {
   const { overall } = getPlayerOverall(playerData.score, playerData.positions)
   return {
      _isUser: userConnectedId === playerData.user._id,
      name: <span style={{ display: 'flex', alignItems: 'center' }}>
         <Overall overall={overall} style={{ marginRight: '1em' }} />
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
      options: zenToolbox.getOptionsByEnum(PlayerPosition),
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