import React from 'react'
import { FormikEssentials } from '@_components/FormikInput'
import PlayerCard from '@_components/PlayerCard'
import { Fab, Grid } from '@material-ui/core'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { get } from 'lodash'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded'

type Props = {
   formik: FormikEssentials
}

const _Final_Save: React.FC<Props> = props => {
   const { formik } = props
   const { score = initialScoreValues, positions = [] } = get(formik, 'values.player', {})
   const { country, surname } = get(formik, 'values.user', {})

  return (
    <Grid container justify='center'>
      <Grid item>
         <PlayerCard {...{ score, positions, country: get(country, 'value', null), surname }} />
      </Grid>
      <Grid item container xs={12} justify='center'>
         <Grid item>
         <Fab color='primary' onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
            <SaveRoundedIcon />
         </Fab>
         </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(_Final_Save)
