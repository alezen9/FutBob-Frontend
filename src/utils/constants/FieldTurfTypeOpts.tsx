import React from 'react'
import { OptionType } from '@_components/FormikInput'
import { FieldState } from '@_SDK_Field/types'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'
import { RadiationIcon } from '@_icons'

export const FieldTurfTypeOpts: OptionType[] = [
   {
      value: FieldState.Great,
      label: 'Great',
      component: <span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
         <ThumbUpRoundedIcon style={{ color: 'limegreen', fontSize: '1.2em' }} />
         <span style={{ marginLeft: '1em' }}>Great</span>
      </span>,
      icon: <ThumbUpRoundedIcon style={{ color: 'limegreen', fontSize: '1.2em' }} />
   },
   {
      value: FieldState.NotGreatNotTerrible,
      label: 'Not great not terrible',
      component: <span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
         <RadiationIcon style={{ color: 'orange', fontSize: '1.2em' }} />
         <span style={{ marginLeft: '1em' }}>Not great not terrible</span>
      </span>,
      icon: <RadiationIcon style={{ color: 'orange', fontSize: '1.2em' }} />
   },
   {
      value: FieldState.Terrible,
      label: 'Terrible',
      component: <span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
         <ThumbDownRoundedIcon style={{ color: 'crimson', fontSize: '1.2em' }} />
         <span style={{ marginLeft: '1em' }}>Terrible</span>
      </span>,
      icon: <ThumbDownRoundedIcon style={{ color: 'crimson', fontSize: '1.2em' }} />
   }
]