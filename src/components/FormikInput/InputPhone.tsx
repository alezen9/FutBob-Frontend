import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
const MuiPhoneNumber = dynamic(() => import('material-ui-phone-number'),{ssr:false})
import { makeStyles, FormHelperText } from '@material-ui/core'
import { uniqueId, get, isEmpty } from 'lodash'
import { FutBobPalette } from '../../../palette'

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(2),
    width: '100%',
    '& fieldset': {
      borderColor: (props: any) => props.error
        ? '#ff443a'
        : FutBobPalette.borderColor
    },
    '& label': {
      color: (props: any) => props.error
        ? '#ff443a'
        : FutBobPalette.typographyGrey
    }
  }
}))

type Props = {
  label: string
  onChange: (e: any) => void
  values: any
  name: string
  disabled?: boolean
  errors: any
}

const InputPhone: React.FC<Props> = props => {
  const { label, onChange, values, name, disabled = false, errors } = props
  const classes = useStyles({error: !!get(errors, name, null)})
  const v: string = useMemo(() => !String(get(values, name, '')).startsWith('+') 
    ? '+39' + get(values, name, '') 
    : get(values, name, '')
  , [get(values, name, null)])
  return (
    <>
      <MuiPhoneNumber
        //@ts-ignore
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
