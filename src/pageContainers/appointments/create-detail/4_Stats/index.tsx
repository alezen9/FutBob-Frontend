import { Grid } from '@material-ui/core'
import React from 'react'
import { AppointmentStats } from 'src/SDK/Modules/Appointment/types'

type Props = {
   _id: string
   stats: AppointmentStats
}

const _Stats: React.FC<Props> = props => {

   console.log(props.stats)

   return (
      <Grid container spacing={3} justify='space-between'>
         stats
      </Grid>
   )
}

export default _Stats
