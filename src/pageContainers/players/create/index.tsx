import React, { useMemo } from 'react'
import { Grid } from '@material-ui/core'
import ZenStepper, { ZenStep } from '@_components/ZenStepper'
import { useStepperFlow } from '@_components/ZenStepper/helper'
import { useFormik } from 'formik'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { isEmpty } from 'lodash'

type StepType = 'registry'|'skills'

const steps: StepType[] = ['registry', 'skills']

const stepperConfig = { steps }

const CreateContainer = () => {
   const { status, flowConfig, resetStatus } = useStepperFlow<StepType>(stepperConfig)

   const formik = useFormik({
      initialValues: {
         user: {},
         player: {
            score: initialScoreValues
         }
      },
      onSubmit: () => {}
   })

   const { disablePrev, disableNext } = useMemo(() => {
      const { registry, skills } = status
      const { user, player } = formik.errors
      if(registry.active) {
         return { 
         disablePrev: false,
         disableNext: !isEmpty(user)
         }
      }
      if(skills.active) {
         return { 
         disablePrev: false,
         disableNext: !isEmpty(player)
         }
      }
      return { 
         disablePrev: false,
         disableNext: true
      }
  }, [JSON.stringify(status), JSON.stringify(formik.errors)])

   return (
      <Grid container justify='center'>
         <ZenStepper>
            <ZenStep />
         </ZenStepper>
      </Grid>
   )
}

export default React.memo(CreateContainer)
