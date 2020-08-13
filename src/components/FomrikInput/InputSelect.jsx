import React, { useRef } from 'react'
import { get, sortBy } from 'lodash'
import { Select, MenuItem, InputLabel, FormHelperText, FilledInput, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FutBobPalette } from '../../../palette'

const useStyles = makeStyles(theme => ({
  menuItem: {
    minWidth: 250,
    width: '100%',
    padding: '.5em',
    '&:before': {
      width: '95% !important'
    }
  },
  inputRoot: {
    '& fieldset': {
      borderColor: ({ error }) => error
        ? '#ff443a'
        : FutBobPalette.borderColor
    }
  },
  labelClass: {
    color: ({ error }) => error
      ? '#ff443a'
      : FutBobPalette.typographyGrey
  }
}))

const promoteItem = ({ arr = [], value }) => {
  let data = arr
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value === value) {
      var a = arr.splice(i, 1) // removes the item
      arr.unshift(a[0]) // adds it back to the beginning
      break
    }
  }
  return data
  // Matching item wasn't found. Array is unchanged, but you could do something
  // else here if you wish (like an error message).
}

export const measureText = (pText, pFontSize, pStyle) => {
  var lDiv = document.createElement('div')
  document.body.appendChild(lDiv)
  if (pStyle != null) {
    lDiv.style = pStyle
  }
  lDiv.style.fontSize = '' + pFontSize + 'px'
  lDiv.style.position = 'absolute'
  lDiv.style.left = -1000
  lDiv.style.top = -1000
  lDiv.innerHTML = pText
  var lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight
  }
  document.body.removeChild(lDiv)
  lDiv = null

  return lResult
}

const InputSelect = ({ options = null, label, id, name, required, handleChange, values, disabled, errors, helperText, onChange, variant, sortByLabel = true }) => {
  const { menuItem, inputRoot, labelClass } = useStyles({ error: !!get(errors, name, false) })
  const labelRef = useRef(null)
  const labelWidth = labelRef.current ? labelRef.current.offsetWidth : measureText(label).width

  const Options = options => options && promoteItem({
    arr: sortByLabel
      ? sortBy(options, ['label'])
      : options,
    value: -1
  }).map((opt, i) =>
    <MenuItem className={menuItem} key={i} value={opt.value}>
      <Typography>{get(opt, 'component', opt.label)}</Typography>
    </MenuItem>)

  const input = variant === 'filled' ? { input: <FilledInput name={name} /> } : {}

  return (
    <>
      <InputLabel className={labelClass} ref={labelRef} htmlFor={id}>{label}</InputLabel>
      <Select
        className={inputRoot}
        labelWidth={labelWidth}
        disabled={disabled}
        value={get(values, `${name}`, '')}
        onChange={onChange}
        variant={variant}
        renderValue={val => {
          const v = options.find(({ value }) => val === value)
          return <Typography style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{get(v, 'component', v.label)}</Typography>
        }}
        {...input}
        inputProps={{ id }}
      >
      >
        {Options(options)}
      </Select>
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
    </>
  )
}

export default React.memo(InputSelect)
