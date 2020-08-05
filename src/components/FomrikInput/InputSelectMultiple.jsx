import React, { useRef } from 'react'
import { get, find, last, isEmpty } from 'lodash'
import { Select, MenuItem, InputLabel, FormHelperText, FilledInput, Typography, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { measureText } from './InputSelect'

const useStyles = makeStyles(theme => ({
  menuItem: {
    minWidth: 250
  },
  adornment: {
    width: 'auto',
    whiteSpace: 'nowrap',
    paddingTop: 16,
    paddingRight: 10
  }
}))

const InputSelectMultiple = ({ options = null, label, id, name, required, handleChange, values, disabled, errors, helperText, onChange, variant }) => {
  const { menuItem, adornment } = useStyles()
  const labelRef = useRef(null)
  const labelWidth = labelRef.current ? labelRef.current.offsetWidth : measureText(label).width

  const renderOptions = options && options.filter(opt => !find(values[name], ['value', opt.value]))

  const Options = options => options && options.map((opt, i) =>
    <MenuItem name={opt.label} className={menuItem} key={i} value={opt.value}>
      <Typography>{opt.label}</Typography>
    </MenuItem>)

  const renderValue = (v) => {
    const res = last(values[name])
    return res ? res.label : null
  }

  const input = variant === 'filled' ? { input: <FilledInput name={name} /> } : {}

  return (
    <>
      <InputLabel ref={labelRef} htmlFor={id}>{label}</InputLabel>
      <Select
        labelWidth={labelWidth}
        multiple
        disabled={disabled}
        label={label}
        value={get(values, name, [])}
        renderValue={renderValue}
        onChange={onChange}
        autoWidth
        variant={variant}
        {...input}
        inputProps={{ id }}
        // startAdornment={!isEmpty(get(values, name, [])) && <InputAdornment className={adornment}><Typography>Last selected:</Typography></InputAdornment>}
      >
      >
        {false && <MenuItem className={menuItem} key={-1} value=''>
          <Typography>-</Typography>
        </MenuItem>}
        {Options(renderOptions)}
      </Select>
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
    </>
  )
}

export default InputSelectMultiple
