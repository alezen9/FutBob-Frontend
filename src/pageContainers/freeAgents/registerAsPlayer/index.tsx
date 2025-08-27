import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Grid } from '@mui/material'
import ZenStepper, { ZenStep } from '@_components/ZenStepper'
import { useStepperFlow } from '@_components/ZenStepper/helper'
import { useFormik } from 'formik'
import { initialScoreValues } from '@_utils/constants/InitValuesPlayerScore'
import { get, isEmpty } from 'lodash'
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded'
import OfflineBoltRoundedIcon from '@mui/icons-material/OfflineBoltRounded'
import _Registry from './1_Registry'
import _Final_Save from './3_Final_Save'
import _Skills from './2_Skills'
import { schema, createPlayer } from './helpers'
import FinalActions from './FinalActions'
import { useConfigStore } from '@_zustand/config'
import { ConfigStore } from '@_zustand/config/helpers'
import { useRouter } from 'next/router'
import { useSWRFreeAgent } from '@_swr/FreeAgent'

type StepType = 'registry'|'skills'

const steps: StepType[] = ['registry', 'skills']

const stepperConfig = { steps }

const stateSelector = (state: ConfigStore) => ({
	openSnackbar: state.openSnackbar,
	setIsLoading: state.setIsLoading
})

const RegisterFreeAgentAsPlayerContainer = () => {
   const router = useRouter()
   const { _id } = router.query
   const { item } = useSWRFreeAgent(_id as string)
   
   const { status, flowConfig, backOneFromFinal, resetStatus } = useStepperFlow<StepType>(stepperConfig)
   const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
   const [playerID, setPlayerID] = useState(null)
   const [initialErrors, setInitialErrors] = useState({})

   const formik = useFormik({
      initialValues: {
         _id,
         user: {
            name: get(item, 'name', null),
            surname: get(item, 'surname', null)
         },
         player: {
            score: initialScoreValues
         }
      },
      validationSchema: schema,
      validateOnMount: true,
      isInitialValid: false,
      enableReinitialize: true,
      onSubmit: createPlayer({ openSnackbar, setIsLoading, setPlayerID })
   })

   useEffect(() => {
      if(isEmpty(initialErrors) && !isEmpty(formik.errors.user)) setInitialErrors(formik.errors)
   }, [JSON.stringify(formik.errors), isEmpty(initialErrors)])

   const onReset = useCallback(() => {
    resetStatus()
    formik.resetForm()
    formik.setErrors(initialErrors)
  }, [resetStatus, formik.resetForm, isEmpty(initialErrors)])

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
            OnCompleteStep={<_Final_Save {...{ formik, playerID }} />}
            disableNext={disableNext}
            disablePrev={disablePrev}
            FinalActions={<FinalActions {...{ onReset, onBack: backOneFromFinal, formik, playerID }} />}
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

export default React.memo(RegisterFreeAgentAsPlayerContainer)
