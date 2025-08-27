import React from 'react'
import { FormHelperText, useMediaQuery } from '@mui/material'
import { createTheme, Theme, useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { get } from 'lodash'
import { makeStyles } from '@mui/styles'
import { ZenPalette } from '@_MUITheme'

const defaultTheme = createTheme()

const useStyles = makeStyles<Theme, { error: boolean }>((theme) => ({
  textField: {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: (props) => (props.error ? '#ff443a' : ZenPalette.borderColor),
    },
    '& .MuiInputLabel-root': {
      color: (props) => (props.error ? '#ff443a' : ZenPalette.typographyGrey),
    },
  },
  // optional: tweak the picker paper in dark mode
  popover:
    theme.palette.mode === 'dark'
      ? {
          '& .MuiPickersLayout-root': {
            color: ZenPalette.typographyGrey,
          },
          '& .MuiPickersCalendarHeader-root .MuiIconButton-root': {
            backgroundColor: ZenPalette.paperBackgroundColor,
          },
        }
      : {},
}), {defaultTheme})

type Props = {
  id: string
  label: string
  onChange: (value: Dayjs | null) => void
  values: any
  name: string
  disabled?: boolean
  errors: any
  minDate?: Dayjs
  maxDate?: Dayjs
}

const InputDate: React.FC<Props> = ({
  id,
  label,
  onChange,
  values,
  name,
  disabled = false,
  errors,
  minDate,
  maxDate,
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const error = !!get(errors, name, null)
  const classes = useStyles({ error })

  const value = get(values, name, null) ? dayjs(get(values, name)) : null

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          format="DD/MM/YYYY"
          // orientation is not needed; picker chooses mobile/desktop automatically.
          slotProps={{
            // pass props to the internal TextField
            textField: {
              id,
              className: classes.textField,
              variant: 'outlined',
              margin: 'normal',
              fullWidth: true,
              // if you prefer the helper below, keep these off:
              // error,
              // helperText: error ? get(errors, name, '') : undefined,
            },
            // paper props for the dialog/popover (class for custom dark tweaks)
            desktopPaper: { className: classes.popover },
            mobilePaper: { className: classes.popover },
          }}
        />
        {error && (
          <FormHelperText
            margin="dense"
            style={{ color: 'red' }}
            id={`${id}_error`}
          >
            {get(errors, name, '')}
          </FormHelperText>
        )}
      </>
    </LocalizationProvider>
  )
}

export default React.memo(InputDate)