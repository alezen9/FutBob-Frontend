import React from 'react'
import { get, mean } from 'lodash'
import { OverallScore } from '@_icons'
import { playerPhysicalStateOptions, getLabelsByValues, futsalPositionsOptions, initialScoreValues, getOptionsByEnum } from '@_utils/helpers'
import moment from 'moment'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import ListField from '@_components/ListField'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { getMeanScoreField } from '@_components/FormikInput/PlayerScoreInputs/SingleScore'
import { Player, PlayerPosition, PlayerScore } from '@_SDK_Player/entities'
import { Filter } from '@_components/Filters/Inputs'
import { CountryOptions } from '@_utils/nationalities'

export const headers = [
  { name: 'Name', style: { minWidth: 230 } },
  { name: 'Physical state', style: { minWidth: 130, textAlign: 'center' } },
  { name: 'Positions', style: { minWidth: 100, textAlign: 'center' } },
  { name: 'Country', style: { maxWidth: 50, textAlign: 'center' } },
  { name: 'Age', style: { maxWidth: 70, textAlign: 'center' } },
  { name: 'Phone', style: { minWidth: 180 } }
]

const getMeanScore = (score: PlayerScore) => parseInt(String(mean(Object.entries(score).map(([key, value]) => getMeanScoreField(value)))))

export const getPlayerDataRow = ({ openDialog, goToDetails, userConnectedId }) => (playerData: Player) => {
  const score = get(playerData, 'score', initialScoreValues)
  const playerValue = getMeanScore(score)
  return {
    _isUser: userConnectedId === playerData.user._id,
    name: <span style={{ display: 'flex', alignItems: 'center' }}>
      <OverallScore value={playerValue} style={{ transform: 'scale(.75)' }} />
      {`${get(playerData, 'user.registry.surname', '-')} ${get(playerData, 'user.registry.name', '-')}`}
    </span>,
    fullName: `${get(playerData, 'user.registry.surname', '-')} ${get(playerData, 'user.registry.name', '-')}`,
    physicalState: playerPhysicalStateOptions.find(({ value }) => value === get(playerData, 'state', 0)).label,
    age: moment().diff(get(playerData, 'user.registry.dateOfBirth', null), 'years'),
    phone: get(playerData, 'user.registry.phone', '-'),
    country: get(playerData, 'user.registry.country', '-'),
    positions: <ListField
      data={getLabelsByValues({
        values: get(playerData, 'positions', []),
        options: futsalPositionsOptions
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
    options: futsalPositionsOptions,
    separator: '\n'
  })
  return list
}

export const playerFilters: Filter[] = [
  {
   type: 'select',
   name: 'states',
   label: 'Physical state',
   options: playerPhysicalStateOptions,
   multiple: true
  },
  {
   type: 'select',
   name: 'positions',
   label: 'Position',
   options: getOptionsByEnum(PlayerPosition),
   multiple: true
  },
  {
   type: 'autocomplete',
   name: 'countries',
   label: 'Nationality',
   options: CountryOptions,
   multiple: true
  }
]