import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'

type Props = {
  title?: any
}

const CustomDivider: React.FC<Props> = props => {
  const { title = '' } = props
  return (
    <Grid item xs={12}>
      <Typography>{title}</Typography>
      <Divider />
    </Grid>
  )
}

export default React.memo(CustomDivider)
