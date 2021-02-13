import React, { useCallback, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import ZenStepper, { ZenStep } from '@_components/ZenStepper'
import { useStepperFlow } from '@_components/ZenStepper/helper'
import { useFormik } from 'formik'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { isEmpty } from 'lodash'
import FingerprintRoundedIcon from '@material-ui/icons/FingerprintRounded'
import OfflineBoltRoundedIcon from '@material-ui/icons/OfflineBoltRounded'
import _Registry from './1_Registry'
import _Final_Save from './3_Final_Save'
import _Skills from './2_Skills'
import { schema } from './helpers'
import ResetStepperBtn from './ResetStepperBtn'

type StepType = 'registry'|'skills'

const steps: StepType[] = ['registry', 'skills']

const stepperConfig = { steps }

const CreatePlayerContainer = () => {
   const { status, flowConfig, resetStatus } = useStepperFlow<StepType>(stepperConfig)

   const formik = useFormik({
      initialValues: {
         user: {},
         player: {
            score: initialScoreValues
         }
      },
      validationSchema: schema,
      onSubmit: () => {}
   })

   const onReset = useCallback(() => {
    resetStatus()
    formik.resetForm()
  }, [resetStatus, formik.resetForm])

   const { disablePrev, disableNext } = useMemo(() => {
      const { registry, skills } = status
      const { user, player } = formik.errors
      if(registry.active) {
         return { 
         disablePrev: false,
         disableNext: !isEmpty(user) || isEmpty(formik.values.user)
         }
      }
      if(skills.active) {
         return { 
         disablePrev: false,
         disableNext: !isEmpty(player) || isEmpty(formik.values.player)
         }
      }
      return { 
         disablePrev: false,
         disableNext: true
      }
  }, [JSON.stringify(status), JSON.stringify(formik.errors), isEmpty(formik.values.user), isEmpty(formik.values.player)])

   return (
      <Grid container justify='center'>
         <ZenStepper
            flowConfig={flowConfig}
            OnCompleteStep={<_Final_Save formik={formik} />}
            disableNext={disableNext}
            disablePrev={disablePrev}
            resetButton={<ResetStepperBtn {...{ onReset, formik }} />}
         >
            <ZenStep
               title='Registry'
               icon={<FingerprintRoundedIcon />}
               component={<_Registry formik={formik} />}
            />
            <ZenStep
               title='Skills'
               icon={<OfflineBoltRoundedIcon />}
               component={<_Skills formik={formik} />}
            />
         </ZenStepper>
      </Grid>
   )
}

export default React.memo(CreatePlayerContainer)
