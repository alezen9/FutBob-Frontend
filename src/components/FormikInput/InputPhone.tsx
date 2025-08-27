import React, { useMemo } from 'react'
import {MuiTelInput, MuiTelInputInfo} from 'mui-tel-input'
import { createTheme, FormHelperText } from '@mui/material'
import { uniqueId, get, isEmpty } from 'lodash'
import { ZenPalette } from '@_MUITheme'
import { makeStyles } from '@mui/styles'

const defaultTheme = createTheme()

const useStyles = makeStyles(theme => ({
   textField: {
      marginTop: theme.spacing(2),
      width: '100%',
      '& fieldset': {
         borderColor: (props: any) => props.error
            ? '#ff443a'
            : ZenPalette.borderColor
      },
      '& label': {
         color: (props: any) => props.error
            ? '#ff443a'
            : ZenPalette.typographyGrey
      }
   }
}), {defaultTheme})

const formatPhoneNumber = (val: string): string => {
   const res = [...(val || '').replace(/\s+/g, '')].map((el, i) => {
      return el === ' '
         ? ''
         : i === 2 || i === 5
            ? `${el} `
            : el
   }).join('').slice(0, 15)
   return res
}

type Props = {
   label: string
   onChange: (e: any) => void
   values: any
   name: string
   disabled?: boolean
   errors: any
}

const InputPhone = (props: Props) => {
   const { label, onChange, values, name, disabled = false, errors } = props
   const classes = useStyles({ error: !!get(errors, name, null) })
   const v: string = useMemo(() => !String(get(values, name, '')).startsWith('+')
      ? '+39' + get(values, name, '')
      : get(values, name, '')
      , [get(values, name, null)])

   const handleChange = (v: string): void => {
      if (v && !v.startsWith('+39')) {
         const val = (v || '').replace(/\s+|\D/g, '')
         const val1 = val.startsWith('39')
            ? `+${val}`
            : `+39${val}`
         const finalVal = val1.slice(0, 13)
         onChange(formatPhoneNumber(finalVal))
      } else onChange(formatPhoneNumber(v))
   }

   const onPaste = (e: any): void => {
      const paste = (e.clipboardData || window['clipboardData']).getData('text')
      if (paste) handleChange(paste)
   }

   return (
      <>
         <MuiTelInput
  value={v ?? ''}
  label={label}
  defaultCountry="IT"
  onlyCountries={['IT']}
  forceCallingCode       // replaces countryCodeEditable={false}
  disableDropdown        // (optional) lock country selection
  variant="outlined"
  onChange={(val: string, _info: MuiTelInputInfo) => onChange(val)}
  onPaste={onPaste}
  className={classes.textField}
  disabled={disabled}
  name={name}
/>
         {!isEmpty(get(errors, name, false)) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${uniqueId('phone-')}_error`}>{get(errors, name, '')}</FormHelperText>}
      </>
   )
}

export default React.memo(InputPhone)
