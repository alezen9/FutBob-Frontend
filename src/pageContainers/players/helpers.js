import React from 'react'
import { get, mean } from 'lodash'
import { OverallScore } from '../../assets/CustomIcon'
import { playerPhysicalStateOptions, getLabelsByValues, futsalPositionsOptions } from '../../utils/helpers'
import moment from 'moment'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import ListField from '../../components/ListField'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import { InputAdornment } from '@material-ui/core'

export const headers = [
  { name: 'Name', style: { minWidth: 230 } },
  { name: 'Physical state', style: { minWidth: 160, textAlign: 'left' } },
  { name: 'Positions', style: { minWidth: 190, textAlign: 'left' } },
  { name: 'Age', style: { maxWidth: 70 } },
  { name: 'Phone', style: { minWidth: 180 } }
]

export const getPlayerDataRow = ({ isLoading, openSnackbar, getData, openDialog, goToDetails }) => playerData => {
  const playerValue = parseInt(mean(Object.values(get(playerData, 'radar', {}))))

  return {
    name: <span style={{ display: 'flex', alignItems: 'center' }}>
      <OverallScore value={playerValue} style={{ transform: 'scale(.75)' }} />
      {`${get(playerData, 'user.surname', '-')} ${get(playerData, 'user.name', '-')}`}
    </span>,
    fullName: `${get(playerData, 'user.surname', '-')} ${get(playerData, 'user.name', '-')}`,
    physicalState: playerPhysicalStateOptions.find(({ value }) => value === get(playerData, 'state', 0)).label,
    age: moment().diff(get(playerData, 'user.dateOfBirth', null), 'years'),
    phone: get(playerData, 'user.phone', '-'),
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

const SearchAdornment = () => <InputAdornment position='end' >
  <SearchRoundedIcon />
</InputAdornment>

export const filters = [
  {
    type: 'text',
    name: 'searchText',
    label: 'Search',
    sm: 6,
    lg: 4,
    inputProps: {
      endAdornment: <SearchAdornment />
    }
  }
  // {
  //   type: 'selectMultiple',
  //   name: 'state',
  //   label: 'Stato su Condexo',
  //   initialValue: [{ label: 'Tutti', value: -1 }],
  //   sm: 6,
  //   lg: 3,
  //   options: UserStato
  // }
]
