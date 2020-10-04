import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { get } from 'lodash'
import { makeStyles, FormHelperText, InputAdornment, CircularProgress } from '@material-ui/core'
import { FutBobPalette } from '../../../palette'
import { OptionType } from '.'

const useStyles = makeStyles(theme => ({
  paper: {
    boxShadow: theme.shadows[24]
  },
  listbox: {
    padding: '.5em'
  },
  option: {
    position: 'relative',
    padding: '.5em 1em',
    minWidth: 150,
    display: 'flex',
    '&:not(:last-of-type):before': {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      content: '""',
      width: '90%',
      height: '100%',
      borderBottom: theme.type === 'light'
        ? '1px solid rgba(0,0,0,.1)'
        : '1px solid rgba(255,255,255,.2)'
    },
    ...theme.type === 'dark' && {
      '&:hover': {
        backgroundColor: '#444'
      }
    }
  },
  groupLabel: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    backgroundColor: theme.type === 'light'
      ? '#d3d3d3'
      : '#111'
  },
  noOptions: {
    color: FutBobPalette.typographyGrey
  },
  inputRoot: {
    '& > fieldset': {
      borderColor: (props: any) => props.error
        ? '#ff443a'
        : FutBobPalette.borderColor
    }
  }
}))

const Adornment = React.memo(() => <InputAdornment position='end' >
  <CircularProgress style={{ width: 20, height: 20 }} />
</InputAdornment>)

const inputProps = {
  endAdornment: <Adornment />
}

type Props = {
  options?: OptionType[]
  label: string
  id?: string
  name: string
  required?: boolean
  disabled?: boolean
  errors: any
  onChange: (e: any, d: any) => void
  onSearchText?: (v: string) => void
  multiple?: boolean 
  loading?: boolean
}

const InputAsyncAutocomplete = (props: Props) => {
  const { options = [], label, id, name, disabled, errors, onChange, onSearchText, multiple = false, loading = false } = props
  const classes = useStyles({ error: !!get(errors, name, false) })
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <Autocomplete
        id={id}
        freeSolo
        loading={loading}
        multiple={multiple}
        disabled={disabled}
        classes={classes}
        options={options}
        onChange={onChange}
        ChipProps={{ style: { display: 'none' } }}
        getOptionLabel={option => option.label || ''}
        inputValue={inputValue}
        onInputChange={(e, d) => {
          setInputValue(d || '')
          const shoudFetch = e.type === 'change'
          if (shoudFetch && d && d !== '') onSearchText(d)
        }}
        renderInput={params => <TextField {...params} {...loading && { InputProps: inputProps }} label={label} variant='outlined' />}
      />
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${id}_error`}>{get(errors, name, '')}</FormHelperText>}
    </>
  )
}

export default React.memo(InputAsyncAutocomplete)
