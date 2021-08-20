import { Grid } from '@material-ui/core'
import zenHooks from '@_utils/hooks'
import React from 'react'

const _Invites = () => {
   const { searchPlayersAndFreeAgentOnType } = zenHooks.asyncSearch.usePlayersAsyncSearch()

   return (
      <Grid container>
         invites
      </Grid>
   )
}

export default _Invites