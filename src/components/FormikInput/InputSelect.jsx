import React, { useRef, useCallback } from 'react'
import { get, sortBy, last, find } from 'lodash'
import { Select, MenuItem, InputLabel, FormHelperText, Typography } from '@material-ui/core'
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

const InputSelect = props => {
  const {
    options = null,
    label,
    id,
    name,
    required,
    values,
    disabled,
    errors,
    onChange,
    variant,
    sortByLabel = true,
    multiple = false,
    autoWidth = false
  } = props
  const { menuItem, inputRoot, labelClass } = useStyles({ error: !!get(errors, name, false) })
  const labelRef = useRef(null)
  const labelWidth = labelRef.current ? labelRef.current.offsetWidth : measureText(label).width

  const Options = useCallback(
    options => {
      if (options && options.length) {
        const opt = multiple
          ? options.filter(opt => !find(get(values, name, []), ['value', opt.value]))
          : options
        return promoteItem({
          arr: sortByLabel
            ? sortBy(opt, ['label'])
            : opt,
          value: -1
        }).map((opt, i) =>
          <MenuItem className={menuItem} key={i} value={opt.value}>
            <Typography>{get(opt, 'component', opt.label)}</Typography>
          </MenuItem>)
      }
      return []
    }
    , [options, get(values, name, [])])

  const renderValue = useCallback(
    val => {
      if (multiple) {
        const res = last(get(values, name, []))
        return res ? get(res, 'component', res.label) : null
      } else {
        const v = options.find(({ value }) => val === value)
        return <Typography style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{get(v, 'component', v.label)}</Typography>
      }
    }, [multiple, options])

  return (
    <>
      <InputLabel className={labelClass} ref={labelRef} htmlFor={id}>{label}</InputLabel>
      <Select
        className={inputRoot}
        multiple={multiple}
        autoWidth={autoWidth}
        labelWidth={labelWidth}
        disabled={disabled}
        value={get(values, name, multiple ? [] : '')}
        onChange={onChange}
        variant={variant}
        renderValue={renderValue}
        inputProps={{ id, required }}
      >
      >
        {Options(options)}
      </Select>
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
    </>
  )
}

export default React.memo(InputSelect)
