import React from 'react'
import { compact, get, map, mean } from 'lodash'
import { OverallScore } from '@_icons'
import { playerPhysicalStateOptions, getLabelsByValues, futsalPositionsOptions, initialScoreValues, getOptionsByEnum } from '@_utils/helpers'
import moment from 'moment'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import ListField from '@_components/ListField'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { InputAdornment } from '@material-ui/core'
import { useFormik } from 'formik'
import FormikInput from '@_components/FormikInput'
import { getMeanScoreField } from '@_components/FormikInput/PlayerScoreInputs/SingleScore'
import { Player, PlayerPosition, PlayerPositionFutsal, PlayerScore } from '@_entities/Player'
import { Filter } from '@_components/Filters/Inputs'

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
      {`${get(playerData, 'user.surname', '-')} ${get(playerData, 'user.name', '-')}`}
    </span>,
    fullName: `${get(playerData, 'user.surname', '-')} ${get(playerData, 'user.name', '-')}`,
    physicalState: playerPhysicalStateOptions.find(({ value }) => value === get(playerData, 'state', 0)).label,
    age: moment().diff(get(playerData, 'user.dateOfBirth', null), 'years'),
    phone: get(playerData, 'user.phone', '-'),
    country: get(playerData, 'user.country', '-'),
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
    name: 'state',
    label: 'Physical state',
    options: playerPhysicalStateOptions
  },
  {
   type: 'select',
    name: 'position',
    label: 'Position',
    options: getOptionsByEnum(PlayerPositionFutsal)
  }
]