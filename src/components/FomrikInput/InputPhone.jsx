import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
const MuiPhoneNumber = dynamic(() => import('material-ui-phone-number'),{ssr:false})
import { makeStyles, FormHelperText } from '@material-ui/core'
import { uniqueId, get, isEmpty } from 'lodash'
import { inputBorderColorDark } from '../../../darkTheme'
import { inputBorderColorLight } from '../../../lightTheme'
import { FutBobPalette } from '../../../palette'

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(2),
    width: '100%',
    '& fieldset': {
      borderColor: ({ error }) => error
        ? '#ff443a'
        : FutBobPalette.borderColor
    },
    '& label': {
      color: ({ error }) => error
        ? '#ff443a'
        : FutBobPalette.typographyGrey
    }
  }
}))

const InputPhone = (props) => {
  const { label, onChange, values, name, disabled = false, errors } = props
  const classes = useStyles({error: !!get(errors, name, null)})
  const v = useMemo(() => !String(get(values, name, '')).startsWith('+') ? '+39' + get(values, name, '') : get(values, name, ''), [values[name]])
  return (
    <>
      <MuiPhoneNumber
        value={v || ''}
        label={label}
        defaultCountry='it'
        countryCodeEditable={false}
        onlyCountries={['it']}
        variant='outlined'
        onChange={onChange}
        inputClass={classes.textField}
        disabled={disabled}
        name={name}
      />
      {!isEmpty(get(errors, name, false)) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${uniqueId('phone-')}_error`}>{get(errors, name, null)}</FormHelperText>}
    </>
  )
}

export default React.memo(InputPhone)
