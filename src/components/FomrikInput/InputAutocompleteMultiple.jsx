import React, { useMemo, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { sortBy, get } from 'lodash'
import { makeStyles, FormHelperText } from '@material-ui/core'
import { inputBorderColorLight } from '../../../lightTheme'
import { inputBorderColorDark } from '../../../darkTheme'
import { FutBobPalette } from '../../../palette'

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
      borderColor: ({ error }) => error
        ? '#ff443a'
        : theme.type === 'dark'
          ? inputBorderColorDark
          : inputBorderColorLight
    }
  }
}))

const InputAutocompleteMultiple = ({ options = [], grouped, label, id, name, required, handleChange, values, disabled, errors, helperText, onChange, variant }) => {
  const classes = useStyles({ error: !!get(errors, name, false) })
  const optionsRef = useRef(options)
  const optionsToRender = useMemo(() => {
    const valuesKeys = (values[name] || []).map(({ value }) => value)
    return sortBy(optionsRef.current.filter(({ value }) => !valuesKeys.includes(value)), ['label'])
  }, [values[name]])

  return (
    <>
      <Autocomplete
        id={id}
        multiple
        freeSolo
        classes={classes}
        {...grouped && {
          groupBy: option => option.label[0].toUpperCase()
        }}
        value={values[name] || []}
        options={optionsToRender}
        onChange={onChange}
        ChipProps={{ style: { display: 'none' } }}
        getOptionLabel={option => option.label}
        renderInput={params => <TextField {...params} label={label} variant='outlined' />}
      />
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
    </>
  )
}

export default InputAutocompleteMultiple
