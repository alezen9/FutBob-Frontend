import React from 'react'
import { get, mean } from 'lodash'
import { OverallScore } from '../../assets/CustomIcon'
import { playerPhysicalStateOptions, getLabelsByValues, futsalPositionsOptions, initialScoreValues } from '../../utils/helpers'
import moment from 'moment'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import ListField from '../../components/ListField'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import { InputAdornment } from '@material-ui/core'
import { getMeanScoreField } from '../../components/FormikInput/PlayerScoreInputs/SingleScore'
import { useFormik } from 'formik'
import FormikInput from '../../components/FormikInput'

export const headers = [
  { name: 'Name', style: { minWidth: 230 } },
  { name: 'Physical state', style: { minWidth: 130, textAlign: 'left' } },
  { name: 'Positions', style: { minWidth: 100, textAlign: 'center' } },
  { name: 'Country', style: { maxWidth: 50, textAlign: 'center' } },
  { name: 'Age', style: { maxWidth: 70, textAlign: 'center' } },
  { name: 'Phone', style: { minWidth: 180 } }
]

export const getPlayerDataRow = ({ onDelete, goToDetails, playerId }) => playerData => {
  const score = get(playerData, 'score', initialScoreValues)
  const playerValue = parseInt(String(mean(Object.entries(score).map(([key, value]) => getMeanScoreField(value)))))

  return {
    _isUser: playerId === playerData._id,
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
        onClick: onDelete(playerData),
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



/**
 * TEMPORARY
 */

type SearchBoxProps = {
  onTextChange: (v: any) => void
}

export const SearchBox = React.memo((props: SearchBoxProps) => {
  const { onTextChange } = props

  const formik = useFormik({
    initialValues: { searchText: '' },
    onSubmit: onTextChange
  })

  return (
    <FormikInput
      xs={12}
      sm={6}
      lg={4}
      name='searchText'
      label='Search'
      inputProps={{
        endAdornment: <SearchAdornment />
      }}
      supplementaryOnChange={onTextChange}
      {...formik}
    />
  )
})