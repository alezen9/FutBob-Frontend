import React, { useEffect, useState } from 'react'
import { FormikEssentials } from '@_components/FormikInput'
import PlayerCard from '@_components/PlayerCard'
import { Fab, Grid } from '@mui/material'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { get } from 'lodash'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import { AnimatePresence, motion } from 'framer-motion'
import SuccessAnimationCheck from '@_components/SuccessAnimationCheck'

type Props = {
   formik: FormikEssentials
   playerID: string | null
}

const _Final_Save: React.FC<Props> = props => {
   const { formik, playerID } = props
   const { score = initialScoreValues, positions = [] } = get(formik, 'values.player', {})
   const { country, surname } = get(formik, 'values.user', {})

   return (
      <Grid container justifyContent='center'>
         <AnimatePresence exitBeforeEnter>
            {!playerID
               ? <>
                  <Grid item>
                     <motion.div
                        initial={{ opacity: 0, transform: 'scale(0.8)' }}
                        animate={{ opacity: 1, transform: 'scale(1)' }}
                        transition={{ duration: 1 }}
                     >
                        <PlayerCard {...{ score, positions, country: get(country, 'value', null), surname }} />
                     </motion.div>
                  </Grid>
                  <Grid item container xs={12} justifyContent='center'>
                     <Grid item>
                        <Fab color='primary' onClick={() => formik.handleSubmit()} disabled={formik.isSubmitting}>
                           <SaveRoundedIcon />
                        </Fab>
                     </Grid>
                  </Grid>
               </>
               : <SuccessAnimationCheck message='Player created successfully' />}
         </AnimatePresence>
      </Grid>
   )
}

export default React.memo(_Final_Save)
