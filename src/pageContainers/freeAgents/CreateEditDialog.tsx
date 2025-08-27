import React, { useCallback } from 'react'
import { Button, Grid } from '@mui/material'
import FormikInput, { FormikEssentials } from '@_components/FormikInput'
import ZenDialog from '@_components/ZenDialog'
import { CreateFreeAgentInput, UpdateFreeAgentInput } from '@_SDK_FreeAgent/inputs'
import { FreeAgent } from '@_SDK_FreeAgent/types'
import { useConfigStore } from '@_zustand/config'
import { ConfigStore } from '@_zustand/config/helpers'
import { Formik, FormikHelpers, useFormik } from 'formik'
import * as yup from 'yup'

const stateSelector = (state: ConfigStore) => ({
  setIsLoading: state.setIsLoading
})

type Props = {
   open: boolean
   item: FreeAgent
   onClose: VoidFunction
   createFreeAgent: (body: CreateFreeAgentInput) => Promise<string>
   updateFreeAgent: (body: UpdateFreeAgentInput) => Promise<boolean>
}

const CreateEditDialog: React.FC<Props> = props => {
   const { open = false, item, onClose, createFreeAgent, updateFreeAgent } = props
   const { _id, name, surname } = (item || {}) as FreeAgent
  const { setIsLoading } = useConfigStore(stateSelector)

   const formik = useFormik({
      initialValues: {
         _id,
         name,
         surname
      },
      validationSchema: schema,
      enableReinitialize: true,
      onSubmit: createUpdatePlayer({ createFreeAgent, updateFreeAgent, setIsLoading, onClose })
   })

   const handleClose = useCallback(() => {
      formik.resetForm()
      onClose()
   }, [onClose, formik.resetForm])

   return (
      <ZenDialog
         open={open}
         onClose={handleClose}
         title={_id ? 'Edit free agent' : 'Create free agent'}
         content={<_Form formik={formik} />}
         maxWidth='xs'
         overflowY='hidden'
         fullScreen={false}
         actions={<_Actions disabled={formik.isSubmitting} onSubmit={formik.handleSubmit} _id={_id} />}
      />
   )
}

export default React.memo(CreateEditDialog)


type _FormProps = {
   formik: FormikEssentials
}

const _Form: React.FC<_FormProps> = React.memo(props => {
   const { formik } = props
   return (
      <Grid container justify='center'>
         <FormikInput
            name='name'
            label='Name'
            {...formik}
         />
         <FormikInput
            name='surname'
            label='Surname'
            {...formik}
         />
      </Grid>
   )
})

type _ActionsProps = {
   onSubmit: VoidFunction
   _id: string
   disabled: boolean
}

const _Actions: React.FC<_ActionsProps> = React.memo(props => {
   const { disabled= false, onSubmit, _id } = props
   return (
      <Grid container justify='flex-end'>
         <Grid item>
            <Button disabled={disabled} onClick={onSubmit} variant='contained' color='primary'>
               {_id ? 'Update' : 'Create'}
            </Button>
         </Grid>
      </Grid>
   )
})


export const createUpdatePlayer = ({ setIsLoading, createFreeAgent, updateFreeAgent, onClose }) => async (
	values: UpdateFreeAgentInput,
	helpers: FormikHelpers<any>
) => {
   setIsLoading(true)
	helpers.setSubmitting(true)
   const { _id, ...createBody } = values
   let done = false
   if(values._id) {
      done = await updateFreeAgent(values)
   } else {
      done = await createFreeAgent(createBody)
   }
   if(done) {
      helpers.resetForm()
      onClose()
   }
	helpers.setSubmitting(false)
   setIsLoading(false)
}

const schema = yup.object().shape({
   name: yup.string().required(),
   surname: yup.string().required()
})