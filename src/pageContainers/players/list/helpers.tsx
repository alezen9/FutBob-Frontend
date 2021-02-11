import React from 'react'
import { get } from 'lodash'
import { OverallScore } from '@_icons'
import { getLabelsByValues } from '@_utils/helpers'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import ListField from '@_components/ListField'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { Filter } from '@_components/Filters/Inputs'
import { getPlayerOverall } from '@_utils/playerOverall'
import { Player, PlayerPosition } from '@_SDK_Player/types'
import dayjs from 'dayjs'
import { CountriesOpts } from '@_utils/constants/CountriesOpts'
import { PhysicalStateOpts } from '@_utils/constants/PhysicalStatusOpt'
import { zenToolboxInstance } from '@_utils/Toolbox'

export const headers = [
  { name: 'Name', style: { minWidth: 230 } },
  { name: 'Physical state', style: { minWidth: 180, textAlign: 'left' } },
  { name: 'Positions', style: { minWidth: 130, textAlign: 'center' } },
  { name: 'Country', style: { maxWidth: 270, textAlign: 'left' } },
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
    positions: <ListField
      data={getLabelsByValues({
        values: get(playerData, 'positions', []),
        options: zenToolboxInstance.getOptionsByEnum(PlayerPosition)
      }).split(',')}
      stringData={getPlayersPositionLabelListString(get(playerData, 'positions', []))}
      typoGraphyLabelPropsForward={{ valueStyle: { whiteSpace: 'pre' } }}
    />,
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

const getPlayersPositionLabelListString = positions => {
  if (!positions || positions.length === 0) return 'Nope, no positions!'
  const list = getLabelsByValues({
    values: positions,
    options: zenToolboxInstance.getOptionsByEnum(PlayerPosition),
    separator: '\n'
  })
  return list
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