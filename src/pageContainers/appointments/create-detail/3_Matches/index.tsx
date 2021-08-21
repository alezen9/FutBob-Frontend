import { Grid } from '@material-ui/core'
import React from 'react'
import { AppointmentMatch } from 'src/SDK/Modules/Appointment/types'

type Props = {
   _id: string
   matches: AppointmentMatch[]
}

const _Matches: React.FC<Props> = props => {
   return (
      <Grid container spacing={3} justify='space-between'>
         matches
      </Grid>
   )
}

export default _Matches
