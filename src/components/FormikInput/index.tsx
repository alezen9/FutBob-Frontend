import React, { useState, Fragment, useMemo } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, Chip, FormControlLabel } from '@material-ui/core'
import { get, uniqBy, uniqueId, compact } from 'lodash'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'
import InputSelect from './InputSelect'
import InputCheckbox from './InputCheckbox'
import InputPhone from './InputPhone'
import InputAddress from './InputAddress'
import InputAsyncAutocomplete from './InputAsyncAutocomplete'
import InputSwitch from './InputSwitch'
import moment from 'moment'
import InputAutocomplete from './InputAutocomplete'
import InputSlider from './InputSlider'

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    marginBottom: 10
  },
  textField: {
    width: '100%'
  },
  chipClass: {
    margin: '.5em',
    borderRadius: 5,
    maxWidth: 'calc(100% - 1em)'
  }
}))

const labelPlacementAccepted = ['top', 'bottom', 'start', 'end']

const FormikInput = props => {
  const { formControl, textField, chipClass } = useStyles()
  const [show, toggleShow] = useState(false)
  const {
    id = `${props.name}_${Math.round(Math.random() * 100)}`,
    name,
    label: _label,
    type = 'text',
    values = {},
    handleChange,
    helperText = '',
    errors = {},
    variant = 'outlined',
    disabled = false,
    xs = 12,
    multiline = false,
    rows = 10,
    grouped = false,
    required = false,
    supplementaryOnChange,
    style = {}
  } = props

  const labelPlacementCorrected = useMemo(() => {
    const { labelPlacement } = props
    if (!labelPlacement) return 'end'
    if (labelPlacementAccepted.includes(labelPlacement)) return labelPlacement
    return 'right'
  }, [get(props, 'labelPlacement', undefined)])

  const label = useMemo(() => typeof _label === 'string'
    ? `${_label || ''}${required ? '*' : ''}`
    : _label, [_label, required])

  const defaultProps = { ...props, id, type, values, handleChange, helperText, errors, variant, disabled, xs, multiline, rows, required, label }

  const PasswordAdornment = () => <InputAdornment position='end' >
    <IconButton aria-label='Vedi/Nascondi password' onClick={() => toggleShow(!show)}>
      {show ? <LockOpen /> : <Lock />}
    </IconButton>
  </InputAdornment>

  let inputProps = {}

  const hasChips = get(values, `${name}.0`, false)

  switch (type) {
    case 'slider':
      const onSliderChange = (e, d) => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, d, true)
      }
      return (
        <GridWrapper {...props} container spacing={2} style={{ margin: '0 0 10px 0', padding: 0 }}>
          <InputSlider {...defaultProps} onChange={onSliderChange} />
        </GridWrapper>
      )
    case 'address':
      const onAddressChange = v => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, v, true)
      }
      return (
        <GridWrapper {...props} container spacing={2} style={{ margin: '0 0 10px 0', padding: 0 }}>
          <InputAddress {...defaultProps} onChange={onAddressChange} />
        </GridWrapper>
      )
    case 'password':
      inputProps = {
        type: show ? 'text' : 'password',
        endAdornment: <PasswordAdornment />
      }
      break
    case 'phone':
      const onChangePhone = v => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, v, true)
      }
      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} {...{ style }} >
            <InputPhone {...defaultProps} onChange={onChangePhone} />
          </FormControl>
        </GridWrapper>
      )
    case 'checkbox':
      const onChangeCheckbox = e => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, e.target.checked, true)
      }
      return (
        <GridWrapper {...props}>
          <FormControlLabel
            style={{ marginTop: 16, ...style }}
            onChange={onChangeCheckbox}
            value={get(values, name, false)}
            control={<InputCheckbox {...defaultProps} formControl={formControl} onChange={onChangeCheckbox} />}
            label={label}
            disabled={disabled}
            labelPlacement={labelPlacementCorrected}
          />
        </GridWrapper>
      )
    case 'switch':
      const onChangeSwitch = e => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, e.target.checked, true)
      }
      return (
        <GridWrapper {...props}>
          <FormControlLabel
            style={{ marginTop: 16, ...style }}
            onChange={onChangeSwitch}
            value={get(values, name, false)}
            control={<InputSwitch {...defaultProps} formControl={formControl} onChange={onChangeSwitch} />}
            label={label}
            disabled={disabled}
            labelPlacement={labelPlacementCorrected}
          />
        </GridWrapper>
      )
    case 'select':
      const onChangeSelect = (e, d) => {
        if (props.multiple) {
          const _v = { value: d.props.value, label: get(d, 'props.children.props.children.props.label', '-') }
          if (_v.value === -1) {
            props.setFieldTouched(name, true, false)
            props.setFieldValue(name, [_v])
          } else if (_v.value !== null) {
            const newValues = [...new Set([...get(values, name, []), _v])]
            props.setFieldTouched(name, true, false)
            props.setFieldValue(name, newValues.filter(({ value }) => value !== -1))
          }
        } else {
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, e.target.value, true)
        }
      }

      const handleChipDelete = (v) => () => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, [...get(values, name, []).filter(val => val.value !== v)])
      }

      const renderChips = () => (get(values, name, []) || []).map((chip, i) => {
        return chip.value === -1
          ? <Fragment key={i} />
          : <Chip
            className={chipClass}
            label={chip.label}
            key={i}
            onDelete={handleChipDelete(chip.value)}
            color='primary'
          />
      })

      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16, ...style }}>
            <InputSelect {...defaultProps} formControl={formControl} onChange={onChangeSelect} />
          </FormControl>
          {hasChips && renderChips()}
        </GridWrapper>
      )
    case 'autocomplete':
      const onChangeAutocomplete = (e, d) => {
        const { component, ...rest } = d || {}
        if (get(d, 'value', null)) {
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, rest)
        } else if (!get(d, 'value', null)) {
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, props.multiple ? [] : null)
        }
      }

      const handleChipDeleteAutoCompleteMultiple = (v) => () => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, [...get(values, name, []).filter(val => val.value !== v)])
      }

      const renderChipsAutoCompleteMultiple = () => get(values, name, []).map((chip, i) => {
        return chip.value === -1 || chip.value === ''
          ? <Fragment key={i} />
          : <Chip
            className={chipClass}
            label={chip.label}
            key={i}
            onDelete={handleChipDeleteAutoCompleteMultiple(chip.value)}
            color='primary'
          />
      })
      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16, ...style }}>
            <InputAutocomplete {...defaultProps} grouped={grouped} formControl={formControl} onChange={onChangeAutocomplete} />
          </FormControl>
          {hasChips && renderChipsAutoCompleteMultiple()}
        </GridWrapper>
      )
    case 'asyncAutocomplete':
      const onChangeAsyncAutocomplete = (e, d) => {
        if (props.multiple) {
          const currentValue = get(values, name, [])
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, compact(uniqBy([...currentValue, d], 'value')))
        } else {
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, d)
        }
      }

      const handleChipDelete3 = (v) => () => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, [...get(values, name, []).filter(val => val.value !== v)])
      }

      const renderChips3 = () => compact(get(values, name, []).map(chip => {
        return !chip || chip.value === -1 || chip.value === ''
          ? null
          : <Chip
            className={chipClass}
            label={chip.label}
            key={uniqueId('asyncAutocompleteChip-')}
            onDelete={handleChipDelete3(chip.value)}
            color='primary'
          />
      }))

      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16, ...style }}>
            <InputAsyncAutocomplete {...defaultProps} onChange={onChangeAsyncAutocomplete} />
          </FormControl>
          {hasChips && renderChips3()}
        </GridWrapper>
      )
    case 'date':
      const onDateChange = e => {
        const v = e.target.value
        const isValidDate = moment(v).isValid()
        if (isValidDate) {
          const isoDate = moment(v).toISOString()
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, isoDate)
        }
      }
      const _v = moment(get(values, name, '')).isValid()
        ? moment(get(values, name, '')).format('YYYY-MM-DD')
        : ''
      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} {...{ style }}>
            <TextField
              id={id}
              name={name}
              label={label}
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              value={_v}
              onChange={onDateChange}
              margin='normal'
              disabled={disabled}
              helperText={helperText}
              error={!!get(errors, name, false)}
              variant={variant}
            />
            {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
          </FormControl>
        </GridWrapper>
      )
    default:
      inputProps = { ...props.inputProps || {} }
      break
  }

  return (
    <GridWrapper {...props}>
      <FormControl variant={variant} className={formControl} {...{ style }}>
        <TextField
          id={id}
          name={name}
          label={label}
          type={type}
          className={textField}
          value={get(values, name, '') || ''}
          onChange={e => {
            props.setFieldTouched(name, true, false)
            handleChange(e)
            if (supplementaryOnChange) supplementaryOnChange(e.target.value)
          }}
          margin='normal'
          disabled={disabled}
          helperText={helperText}
          error={!!get(errors, name, false)}
          variant={variant}
          InputProps={inputProps}
          multiline={multiline}
          rows={rows}
        />
        {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
      </FormControl>
    </GridWrapper>
  )
}

const GridWrapper = React.memo(props => {
  const { xs = 12, sm, md, lg, xl, container, spacing } = props
  return <Grid item {...container && { container: true, spacing: spacing || 0 }} style={{ ...props.style || {} }} xs={xs} sm={sm || xs} md={md || sm || xs} lg={lg || sm || xs} xl={xl || lg || sm || xs}>
    {props.children}
  </Grid>
})

export default React.memo(FormikInput)
